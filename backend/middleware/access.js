/**
 * Unified Access Middleware
 * - requirePermission: checks any-of permissions and/or roles
 * - requireFeature: checks a backend feature toggle is enabled
 */

const { dbMethods } = require('../modules/database/backend');

/**
 * requirePermission
 * @param {Object} opts
 * @param {string[]} [opts.anyOfPermissions]
 * @param {string[]} [opts.anyOfRoles]
 */
const requirePermission = ({ anyOfPermissions = [], anyOfRoles = [] } = {}) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // If nothing specified, allow
    if ((!anyOfPermissions || anyOfPermissions.length === 0) && (!anyOfRoles || anyOfRoles.length === 0)) {
      return next();
    }

    const userPermissions = req.user.permissions || [];
    const userRoles = (req.user.roles || []).map(r => (typeof r === 'string' ? r : r?.name)).filter(Boolean);

    const hasPerm = (anyOfPermissions || []).length === 0
      || anyOfPermissions.some(p => userPermissions.includes(p));

    const hasRole = (anyOfRoles || []).length === 0
      || anyOfRoles.some(r => userRoles.includes(r));

    if (hasPerm || hasRole) {
      return next();
    }

    return res.status(403).json({
      error: 'Access denied: insufficient permissions/roles',
      required: { anyOfPermissions, anyOfRoles }
    });
  };
};

/**
 * requireFeature
 * Ensures a backend feature toggle is enabled
 * @param {string} featureName
 */
const requireFeature = (featureName) => {
  return async (req, res, next) => {
    try {
      const db = req.app.locals.db;
      if (!db) return res.status(500).json({ error: 'Database not initialized' });

      const toggle = await dbMethods.get(db, 'SELECT feature_name, is_enabled FROM feature_toggles WHERE feature_name = ?', [featureName]);

      // Default to disabled if not found to be safe
      if (!toggle || !toggle.is_enabled) {
        return res.status(403).json({ error: `Feature '${featureName}' is disabled` });
      }

      return next();
    } catch (err) {
      console.error('requireFeature error:', err);
      return res.status(500).json({ error: 'Feature validation failed' });
    }
  };
};

module.exports = {
  requirePermission,
  requireFeature,
};
