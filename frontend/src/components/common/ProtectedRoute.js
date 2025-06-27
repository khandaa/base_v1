import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Component to protect routes that require authentication
 * 
 * If the user is authenticated, it renders the children components
 * Otherwise, it redirects to the login page
 */
const ProtectedRoute = ({ children, requiredPermissions = [], requiredRoles = [] }) => {
  const { isAuthenticated, hasPermission, hasRole } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }
  
  // Check if user has required permissions (if any)
  if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" />;
  }
  
  // Check if user has required roles (if any)
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" />;
  }
  
  // User is authenticated and has required permissions/roles, render children
  return children;
};

export default ProtectedRoute;
