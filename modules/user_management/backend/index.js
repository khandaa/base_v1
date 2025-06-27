/**
 * User Management Module - Backend Implementation
 * Created: 2025-06-27
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../../../middleware/auth');
const { checkPermissions } = require('../../../middleware/rbac');
const { dbMethods } = require('../../database/backend');

// Register module events
const registerModuleEvents = (eventBus) => {
  eventBus.on('user:updated', (data) => {
    console.log('User updated event received:', data);
    // Handle user update events
  });

  eventBus.on('user:deleted', (data) => {
    console.log('User deleted event received:', data);
    // Handle user deletion events
  });
};

// Initialize the module
const init = (app) => {
  if (app.locals.eventBus) {
    registerModuleEvents(app.locals.eventBus);
  }
};

/**
 * @route GET /api/user_management/users
 * @description Get all users with optional filtering
 * @access Private - Requires user_view permission
 */
router.get('/users', authenticateToken, checkPermissions(['user_view']), async (req, res) => {
  try {
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Query parameters for filtering
    const { isActive, searchTerm, role } = req.query;
    
    // Base SQL query
    let sql = `
      SELECT 
        u.user_id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.mobile_number, 
        u.is_active,
        u.created_at,
        u.updated_at,
        GROUP_CONCAT(r.name) as roles
      FROM users_master u
      LEFT JOIN user_roles_tx ur ON u.user_id = ur.user_id
      LEFT JOIN roles_master r ON ur.role_id = r.role_id
    `;
    
    // Build WHERE clause based on filters
    const whereConditions = [];
    const params = [];
    
    if (isActive !== undefined) {
      whereConditions.push('u.is_active = ?');
      params.push(isActive === 'true' ? 1 : 0);
    }
    
    if (searchTerm) {
      whereConditions.push('(u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)');
      const searchPattern = `%${searchTerm}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }
    
    if (role) {
      whereConditions.push('r.name = ?');
      params.push(role);
    }
    
    // Add WHERE clause if conditions exist
    if (whereConditions.length > 0) {
      sql += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    // Group by user_id to handle multiple roles per user
    sql += ' GROUP BY u.user_id ORDER BY u.created_at DESC';
    
    const users = await dbMethods.all(db, sql, params);
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'USER_LIST_VIEW',
      details: 'Retrieved list of users',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    return res.status(200).json({
      count: users.length,
      users: users.map(user => ({
        ...user,
        roles: user.roles ? user.roles.split(',') : []
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

/**
 * @route POST /api/user_management/users
 * @description Create a new user
 * @access Private - Requires user_create permission
 */
router.post('/users', [
  authenticateToken, 
  checkPermissions(['user_create']),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile_number').notEmpty().withMessage('Mobile number is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  body('roles').isArray().withMessage('Roles must be an array')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { first_name, last_name, email, mobile_number, password, roles } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if email or mobile already exists
    const existingUser = await dbMethods.get(db, 
      'SELECT user_id FROM users_master WHERE email = ? OR mobile_number = ?', 
      [email, mobile_number]
    );
    
    if (existingUser) {
      return res.status(409).json({ error: 'A user with this email or mobile number already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const result = await dbMethods.run(db, 
      `INSERT INTO users_master (first_name, last_name, email, mobile_number, password_hash, is_active) 
       VALUES (?, ?, ?, ?, ?, 1)`, 
      [first_name, last_name, email, mobile_number, hashedPassword]
    );
    
    const newUserId = result.lastID;
    
    // Assign roles to user if provided
    if (roles && roles.length > 0) {
      for (const roleId of roles) {
        await dbMethods.run(db, 
          'INSERT INTO user_roles_tx (user_id, role_id) VALUES (?, ?)',
          [newUserId, roleId]
        );
      }
    } else {
      // Assign default 'User' role if no roles specified
      const defaultRole = await dbMethods.get(db, 'SELECT role_id FROM roles_master WHERE name = ?', ['User']);
      if (defaultRole) {
        await dbMethods.run(db, 
          'INSERT INTO user_roles_tx (user_id, role_id) VALUES (?, ?)',
          [newUserId, defaultRole.role_id]
        );
      }
    }
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'USER_CREATED',
      details: `Created new user: ${email}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit user created event
    eventBus.emit('user:created', {
      user_id: newUserId,
      email,
      created_by: req.user.user_id
    });
    
    return res.status(201).json({ 
      message: 'User created successfully',
      user_id: newUserId 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * @route GET /api/user_management/users/:id
 * @description Get user by ID
 * @access Private - Requires user_view permission
 */
router.get('/users/:id', authenticateToken, checkPermissions(['user_view']), async (req, res) => {
  try {
    const userId = req.params.id;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Get user data
    const user = await dbMethods.get(db, 
      `SELECT user_id, first_name, last_name, email, mobile_number, is_active, created_at, updated_at 
       FROM users_master WHERE user_id = ?`, 
      [userId]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get user roles
    const roles = await dbMethods.all(db, 
      `SELECT r.role_id, r.name 
       FROM roles_master r 
       JOIN user_roles_tx ur ON r.role_id = ur.role_id 
       WHERE ur.user_id = ?`,
      [userId]
    );
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'USER_DETAIL_VIEW',
      details: `Viewed details for user ID ${userId}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Return user with roles
    return res.status(200).json({
      ...user,
      roles: roles.map(role => ({
        role_id: role.role_id,
        name: role.name
      }))
    });
  } catch (error) {
    console.error(`Error fetching user ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to retrieve user details' });
  }
});

/**
 * @route PUT /api/user_management/users/:id
 * @description Update user information
 * @access Private - Requires user_edit permission
 */
router.put('/users/:id', [
  authenticateToken, 
  checkPermissions(['user_edit']),
  body('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
  body('last_name').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('mobile_number').optional().notEmpty().withMessage('Mobile number cannot be empty'),
  body('roles').optional().isArray().withMessage('Roles must be an array')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userId = req.params.id;
    const { first_name, last_name, email, mobile_number, roles } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if user exists
    const existingUser = await dbMethods.get(db, 'SELECT user_id FROM users_master WHERE user_id = ?', [userId]);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if email or mobile belongs to another user
    if (email) {
      const userWithEmail = await dbMethods.get(db, 
        'SELECT user_id FROM users_master WHERE email = ? AND user_id != ?', 
        [email, userId]
      );
      if (userWithEmail) {
        return res.status(409).json({ error: 'Email is already in use by another user' });
      }
    }
    
    if (mobile_number) {
      const userWithMobile = await dbMethods.get(db, 
        'SELECT user_id FROM users_master WHERE mobile_number = ? AND user_id != ?', 
        [mobile_number, userId]
      );
      if (userWithMobile) {
        return res.status(409).json({ error: 'Mobile number is already in use by another user' });
      }
    }
    
    // Build update query based on provided fields
    const updateFields = [];
    const updateValues = [];
    
    if (first_name) {
      updateFields.push('first_name = ?');
      updateValues.push(first_name);
    }
    
    if (last_name) {
      updateFields.push('last_name = ?');
      updateValues.push(last_name);
    }
    
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    
    if (mobile_number) {
      updateFields.push('mobile_number = ?');
      updateValues.push(mobile_number);
    }
    
    // Add updated_at timestamp
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    
    // Only update if there are fields to update
    if (updateFields.length > 0) {
      updateValues.push(userId);
      await dbMethods.run(db, 
        `UPDATE users_master SET ${updateFields.join(', ')} WHERE user_id = ?`, 
        updateValues
      );
    }
    
    // Update roles if provided
    if (roles) {
      // Delete existing roles first
      await dbMethods.run(db, 'DELETE FROM user_roles_tx WHERE user_id = ?', [userId]);
      
      // Add new roles
      for (const roleId of roles) {
        await dbMethods.run(db, 
          'INSERT INTO user_roles_tx (user_id, role_id) VALUES (?, ?)', 
          [userId, roleId]
        );
      }
    }
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'USER_UPDATED',
      details: `Updated user ID ${userId}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit user updated event
    eventBus.emit('user:updated', {
      user_id: userId,
      updated_by: req.user.user_id
    });
    
    return res.status(200).json({ 
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error(`Error updating user ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * @route PATCH /api/user_management/users/:id/status
 * @description Toggle user active status
 * @access Private - Requires user_edit permission
 */
router.patch('/users/:id/status', [
  authenticateToken, 
  checkPermissions(['user_edit']),
  body('is_active').isBoolean().withMessage('is_active must be a boolean')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userId = req.params.id;
    const { is_active } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if user exists
    const existingUser = await dbMethods.get(db, 'SELECT user_id FROM users_master WHERE user_id = ?', [userId]);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user status
    await dbMethods.run(db, 
      'UPDATE users_master SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', 
      [is_active ? 1 : 0, userId]
    );
    
    // Log activity
    const action = is_active ? 'USER_ACTIVATED' : 'USER_DEACTIVATED';
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action,
      details: `${is_active ? 'Activated' : 'Deactivated'} user ID ${userId}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit user updated event
    eventBus.emit('user:updated', {
      user_id: userId,
      updated_by: req.user.user_id,
      status_changed: true,
      is_active
    });
    
    return res.status(200).json({ 
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error(`Error updating user status ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to update user status' });
  }
});

/**
 * @route DELETE /api/user_management/users/:id
 * @description Delete a user
 * @access Private - Requires user_delete permission
 */
router.delete('/users/:id', authenticateToken, checkPermissions(['user_delete']), async (req, res) => {
  try {
    const userId = req.params.id;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if user exists
    const existingUser = await dbMethods.get(db, 
      'SELECT user_id, email FROM users_master WHERE user_id = ?', 
      [userId]
    );
    
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't allow deletion of the admin user
    const adminUser = await dbMethods.get(db, 
      `SELECT u.user_id FROM users_master u 
       JOIN user_roles_tx ur ON u.user_id = ur.user_id 
       JOIN roles_master r ON ur.role_id = r.role_id 
       WHERE u.user_id = ? AND r.name = 'Admin'`, 
      [userId]
    );
    
    if (adminUser && parseInt(userId) === 1) {
      return res.status(403).json({ error: 'Cannot delete the primary administrator account' });
    }
    
    // Because of ON DELETE CASCADE constraints, deleting from users_master 
    // will automatically delete related records in other tables
    await dbMethods.run(db, 'DELETE FROM users_master WHERE user_id = ?', [userId]);
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'USER_DELETED',
      details: `Deleted user ID ${userId} (${existingUser.email})`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit user deleted event
    eventBus.emit('user:deleted', {
      user_id: userId,
      deleted_by: req.user.user_id,
      email: existingUser.email
    });
    
    return res.status(200).json({ 
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting user ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Export router and init function
module.exports = router;
module.exports.init = init;
