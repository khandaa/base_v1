/**
 * Authentication Middleware
 * Provides JWT token verification and user authentication
 */

const jwt = require('jsonwebtoken');

// JWT Secret - Should be in environment variables for production
// JWT Secret - Should match the one used in authentication module
const JWT_SECRET = 'employdex-base-v1-secure-jwt-secret';

/**
 * Authentication middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    // Extract the user object from the decoded token payload
    // The user information is nested under the 'user' property in the JWT payload
    req.user = decoded.user;
    next();
  });
};

module.exports = {
  authenticateToken,
  JWT_SECRET
};
