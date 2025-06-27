/**
 * Role Management Module - Backend Implementation
 * Created: 2025-06-27
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../../../middleware/auth');
const { checkPermissions } = require('../../../middleware/rbac');
const { dbMethods } = require('../../database/backend');

// Register module events
const registerModuleEvents = (eventBus) => {
  eventBus.on('role:updated', (data) => {
    console.log('Role updated event received:', data);
    // Handle role update events
  });

  eventBus.on('role:deleted', (data) => {
    console.log('Role deleted event received:', data);
    // Handle role deletion events
  });
};

// Initialize the module
const init = (app) => {
  if (app.locals.eventBus) {
    registerModuleEvents(app.locals.eventBus);
  }
};

/**
 * @route GET /api/role_management/roles
 * @description Get all roles
 * @access Private - Requires role_view permission
 */
router.get('/roles', authenticateToken, checkPermissions(['role_view']), async (req, res) => {
  try {
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Query all roles
    const roles = await dbMethods.all(db, 
      'SELECT role_id, name, description, created_at, updated_at FROM roles_master ORDER BY name',
      []
    );
    
    // For each role, get its permissions
    for (const role of roles) {
      const permissions = await dbMethods.all(db, 
        `SELECT p.permission_id, p.name, p.description 
         FROM permissions_master p
         JOIN role_permissions_tx rp ON p.permission_id = rp.permission_id
         WHERE rp.role_id = ?
         ORDER BY p.name`,
        [role.role_id]
      );
      
      // Attach permissions to the role
      role.permissions = permissions;
      
      // Count users with this role
      const userCount = await dbMethods.get(db,
        'SELECT COUNT(DISTINCT user_id) as count FROM user_roles_tx WHERE role_id = ?',
        [role.role_id]
      );
      
      role.user_count = userCount.count;
    }
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'ROLE_LIST_VIEW',
      details: 'Retrieved list of roles',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    return res.status(200).json({
      count: roles.length,
      roles
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return res.status(500).json({ error: 'Failed to retrieve roles' });
  }
});

/**
 * @route GET /api/role_management/roles/:id
 * @description Get role by ID
 * @access Private - Requires role_view permission
 */
router.get('/roles/:id', authenticateToken, checkPermissions(['role_view']), async (req, res) => {
  try {
    const roleId = req.params.id;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Get role data
    const role = await dbMethods.get(db, 
      'SELECT role_id, name, description, created_at, updated_at FROM roles_master WHERE role_id = ?',
      [roleId]
    );
    
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    // Get role permissions
    const permissions = await dbMethods.all(db, 
      `SELECT p.permission_id, p.name, p.description 
       FROM permissions_master p
       JOIN role_permissions_tx rp ON p.permission_id = rp.permission_id
       WHERE rp.role_id = ?
       ORDER BY p.name`,
      [roleId]
    );
    
    // Get users with this role
    const users = await dbMethods.all(db, 
      `SELECT u.user_id, u.first_name, u.last_name, u.email 
       FROM users_master u
       JOIN user_roles_tx ur ON u.user_id = ur.user_id
       WHERE ur.role_id = ?
       LIMIT 100`,
      [roleId]
    );
    
    // Attach permissions and users to the role
    role.permissions = permissions;
    role.users = users;
    role.user_count = users.length;
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'ROLE_DETAIL_VIEW',
      details: `Viewed details for role ID ${roleId}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    return res.status(200).json(role);
  } catch (error) {
    console.error(`Error fetching role ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to retrieve role details' });
  }
});

/**
 * @route POST /api/role_management/roles
 * @description Create a new role
 * @access Private - Requires role_create permission
 */
router.post('/roles', [
  authenticateToken, 
  checkPermissions(['role_create']),
  body('name').notEmpty().withMessage('Role name is required'),
  body('description').optional(),
  body('permissions').isArray().withMessage('Permissions must be an array')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, description, permissions } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if role with the same name already exists
    const existingRole = await dbMethods.get(db, 
      'SELECT role_id FROM roles_master WHERE name = ?', 
      [name]
    );
    
    if (existingRole) {
      return res.status(409).json({ error: 'A role with this name already exists' });
    }
    
    // Create new role
    const result = await dbMethods.run(db, 
      'INSERT INTO roles_master (name, description) VALUES (?, ?)', 
      [name, description || '']
    );
    
    const newRoleId = result.lastID;
    
    // Assign permissions to role if provided
    if (permissions && permissions.length > 0) {
      for (const permissionId of permissions) {
        await dbMethods.run(db, 
          'INSERT INTO role_permissions_tx (role_id, permission_id) VALUES (?, ?)',
          [newRoleId, permissionId]
        );
      }
    }
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'ROLE_CREATED',
      details: `Created new role: ${name}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit role created event
    eventBus.emit('role:created', {
      role_id: newRoleId,
      name,
      created_by: req.user.user_id
    });
    
    return res.status(201).json({ 
      message: 'Role created successfully',
      role_id: newRoleId 
    });
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(500).json({ error: 'Failed to create role' });
  }
});

/**
 * @route PUT /api/role_management/roles/:id
 * @description Update role information
 * @access Private - Requires role_edit permission
 */
router.put('/roles/:id', [
  authenticateToken, 
  checkPermissions(['role_edit']),
  body('name').optional().notEmpty().withMessage('Role name cannot be empty'),
  body('description').optional(),
  body('permissions').optional().isArray().withMessage('Permissions must be an array')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const roleId = req.params.id;
    const { name, description, permissions } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if role exists
    const existingRole = await dbMethods.get(db, 'SELECT role_id FROM roles_master WHERE role_id = ?', [roleId]);
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    // Check if the role is a system role (Admin/User)
    if (roleId <= 2) {
      // Can update description but not name for system roles
      if (name) {
        return res.status(403).json({ error: 'Cannot change the name of system roles' });
      }
    } else if (name) {
      // For custom roles, check if name is unique
      const roleWithName = await dbMethods.get(db, 
        'SELECT role_id FROM roles_master WHERE name = ? AND role_id != ?', 
        [name, roleId]
      );
      if (roleWithName) {
        return res.status(409).json({ error: 'A role with this name already exists' });
      }
    }
    
    // Build update query based on provided fields
    const updateFields = [];
    const updateValues = [];
    
    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    
    // Add updated_at timestamp
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    
    // Only update if there are fields to update
    if (updateFields.length > 0) {
      updateValues.push(roleId);
      await dbMethods.run(db, 
        `UPDATE roles_master SET ${updateFields.join(', ')} WHERE role_id = ?`, 
        updateValues
      );
    }
    
    // Update permissions if provided
    if (permissions) {
      // For Admin role, ensure it keeps all permissions
      if (roleId == 1) {
        const allPermissions = await dbMethods.all(db, 'SELECT permission_id FROM permissions_master');
        const allPermissionIds = allPermissions.map(p => p.permission_id);
        
        // Check if all permissions are included
        const hasAllPermissions = allPermissionIds.every(id => permissions.includes(id));
        
        if (!hasAllPermissions) {
          return res.status(403).json({ error: 'Admin role must have all permissions' });
        }
      }
      
      // Delete existing permissions first
      await dbMethods.run(db, 'DELETE FROM role_permissions_tx WHERE role_id = ?', [roleId]);
      
      // Add new permissions
      for (const permissionId of permissions) {
        await dbMethods.run(db, 
          'INSERT INTO role_permissions_tx (role_id, permission_id) VALUES (?, ?)', 
          [roleId, permissionId]
        );
      }
    }
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'ROLE_UPDATED',
      details: `Updated role ID ${roleId}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit role updated event
    eventBus.emit('role:updated', {
      role_id: roleId,
      updated_by: req.user.user_id
    });
    
    return res.status(200).json({ 
      message: 'Role updated successfully'
    });
  } catch (error) {
    console.error(`Error updating role ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to update role' });
  }
});

/**
 * @route DELETE /api/role_management/roles/:id
 * @description Delete a role
 * @access Private - Requires role_delete permission
 */
router.delete('/roles/:id', authenticateToken, checkPermissions(['role_delete']), async (req, res) => {
  try {
    const roleId = req.params.id;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Get role data
    const role = await dbMethods.get(db, 'SELECT role_id, name FROM roles_master WHERE role_id = ?', [roleId]);
    
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    // Don't allow deletion of the Admin or User roles (IDs 1 and 2)
    if (roleId <= 2) {
      return res.status(403).json({ error: 'Cannot delete system roles (Admin/User)' });
    }
    
    // Check if role has users
    const userCount = await dbMethods.get(db, 
      'SELECT COUNT(*) as count FROM user_roles_tx WHERE role_id = ?', 
      [roleId]
    );
    
    if (userCount.count > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete role with assigned users',
        user_count: userCount.count
      });
    }
    
    // Because of ON DELETE CASCADE constraints, deleting from roles_master 
    // will automatically delete related records in role_permissions_tx
    await dbMethods.run(db, 'DELETE FROM roles_master WHERE role_id = ?', [roleId]);
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'ROLE_DELETED',
      details: `Deleted role ID ${roleId} (${role.name})`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Emit role deleted event
    eventBus.emit('role:deleted', {
      role_id: roleId,
      name: role.name,
      deleted_by: req.user.user_id
    });
    
    return res.status(200).json({ 
      message: 'Role deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting role ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to delete role' });
  }
});

// Export router and init function
module.exports = router;
module.exports.init = init;
