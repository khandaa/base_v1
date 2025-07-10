## [Unreleased]
### Changed
- On the user list page, replaced the "View user" action with an "Edit user" action. The button now navigates to the edit user page and uses the edit icon.
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.20] - 2025-07-10
### Added
- Enhanced User List functionality
  - Added mobile number column to user list table
  - Added inline role editing capability directly from user list page
  - Implemented modal dialog for editing user roles without leaving the list page
  - Added real-time role update with optimistic UI updates
- Enhanced Role List functionality
  - Added inline permission editing capability directly from role list page
  - Implemented modal dialog for managing role permissions without leaving the list page
  - Added categorized permission selection interface for better organization
  - Implemented real-time permission updates with optimistic UI updates
- Implemented modern glassmorphism UI design
  - Added frosted glass effect to cards, modals, tables, and form elements
  - Enhanced buttons with glass effect and subtle hover animations
  - Added glass effect to badges and inputs for a cohesive design
  - Implemented a gradient background for improved visual appeal
  - Applied consistent styling across role management and activity logs pages

## [0.2.19] - 2025-07-10
### Fixed
- Completed fixes for ActivityLogs component issues
  - Completely refactored component to properly handle React hooks and state management
  - Added proper error boundary to catch and display React errors gracefully
  - Implemented state-based permission flags instead of using variables directly
  - Fixed circular dependencies between hooks and function declarations
  - Added comprehensive error handling for auth context access and API calls
  - Improved user feedback for permission and authentication errors

## [0.2.18] - 2025-07-09
### Fixed
- Fixed ActivityLogs component issues
  - Resolved "Cannot read properties of null (reading 'useRef')" error by adding proper null checks
  - Added safe handling of auth context and permission checks
  - Improved error resilience for logs page rendering

## [0.2.17] - 2025-07-09
### Fixed
- Fixed bulk role upload functionality issues
  - Fixed "permissions.reduce is not a function" error in RoleCreate component by adding Array type check
  - Removed non-existent `created_by` column from role creation SQL query to match database schema
  - Fixed template download and bulk upload endpoints by correctly ordering Express routes
  - Updated test scripts to use correct admin credentials
  - Fixed permissions not loading in RoleCreate component by correctly handling nested API response structure

## [0.2.16] - 2025-07-09
### Added
- Implemented bulk role upload functionality
  - Created new RoleBulkUpload component with drag-and-drop file upload
  - Added CSV template download feature for roles
  - Added backend API endpoints for processing bulk role uploads
  - Implemented permission integration and error handling
  - Added support for assigning permissions to roles via CSV upload

## [0.2.15] - 2025-07-09
### Added
- Added ability to change user roles from the edit user page
  - Fixed user role updates in the UserEdit component
  - Synchronized frontend API calls with backend expectations
  - Enhanced user management capabilities for administrators

## [0.2.14] - 2025-07-09
### Added
- Implemented bulk user upload functionality
  - Created new UserBulkUpload component with drag-and-drop file upload
  - Added CSV template download feature for users to get the correct format
  - Added backend API endpoints for processing bulk user uploads
  - Implemented detailed error reporting and success tracking
  - Added validation of CSV data including required fields and existing emails
  - Integrated with existing permission system (requires 'user_create' permission)

## [0.2.13] - 2025-07-09
### Fixed
- Fixed activity over time graph on dashboard not showing proper data
  - Updated backend to generate a complete date range for the last 7 days
  - Ensured all dates within the range are included, even those with zero activity
  - Properly sorted dates in ascending order for correct chart rendering
- Fixed permission denied issue on activity logs page
  - Updated frontend to check for 'activity_view' permission instead of 'log_view'
  - Added role-based access check for Admin and full_access roles
  - Aligned permission naming between frontend and backend components
- Fixed roles not loading on create new user page
  - Added robust response structure handling to properly extract roles data
  - Improved error handling and logging for API responses
  - Fixed data access pattern to handle both flat and nested response structures
- Fixed user creation functionality
  - Updated field name from `role_ids` to `roles` to match backend expectations
  - Added required `mobile_number` field to user creation payload
  - Improved error handling for user creation API calls

## [0.2.12] - 2025-07-09
### Added
- Added activity log access for admin and full_access roles
  - Created new 'activity_view' permission in the database
  - Assigned this permission to admin and full_access roles
  - Modified logging API endpoints to use 'activity_view' permission instead of 'permission_view'
  - Users with these roles can now access activity logs and statistics

## [0.2.11] - 2025-07-09
### Added
- Made dashboard cards clickable to navigate to their respective pages
  - Users card now navigates to users page
  - Roles card now navigates to roles page
  - Permissions card now navigates to permissions page
  - Activities card now navigates to logs page
  - Added visual cursor pointer indicator for better UX

## [0.2.10] - 2025-07-09
### Fixed
- Fixed user management search filter not working
  - Updated backend API to properly handle 'search' parameter from frontend
  - Added backwards compatibility for both 'search' and 'searchTerm' parameters
  - Improved search functionality to properly filter users by name or email

## [0.2.9] - 2025-07-09
### Fixed
- Fixed dashboard cards not showing correct counts for roles, permissions, and activities
  - Updated Dashboard.js to properly access API response data structures
  - Added proper data structure handling for role count, permission count, and activity count
  - Fixed chart data mapping for activity logs and action types
  - Added debugging information to help identify data structure issues

## [0.2.8] - 2025-07-09
### Fixed
- Fixed role names not being visible in users page
  - Updated user_management backend API to include roles data in user list response
  - Improved user listing endpoint to properly fetch and return role information for each user
  - Added better pagination support with total count, page size, and page number
  - Enhanced error handling for user authentication in activity logging

## [0.2.7] - 2025-07-09
### Added
- Created full_access role with all permissions
- Added FA user with full_access role (mobile: 8888888888, email: fa@employdex.com, password: User@123)

### Fixed
- Fixed roles not being displayed in roles management page
  - Updated fetchRoles function in RoleList.js to properly handle API response format
  - Added better error handling for unexpected response formats
  - Added console logging to help diagnose API response issues

## [0.2.6] - 2025-07-10
### Fixed
- Fixed login functionality to properly handle username input
  - Updated frontend form field from 'email' to 'username'
  - Modified backend validation to accept 'username' parameter
  - Fixed API request payload format to match backend expectations
  - Resolved 400 Bad Request error during login

## [0.2.5] - 2025-07-09
### Changed
- Modified login process to support username instead of email
  - Removed email validation from login form
  - Updated backend to allow login with username or email
  - Updated UI labels from "Email Address" to "Username"
  - Updated validation messages for better user experience

## [0.2.4] - 2025-06-27
### Fixed
- Fixed JWT secret mismatch between authentication module and middleware
  - Standardized JWT secret across application components
  - Resolved 403 Forbidden errors when accessing API endpoints

## [0.2.3] - 2025-06-27
### Fixed
- Admin permissions issue in frontend application
  - Fixed JWT token decoding in frontend to correctly extract permissions
  - Admin can now properly manage users, roles, and permissions

## [0.2.2] - 2025-06-27
### Added
- Created 5 demo users with standard "User" role
  - Each user has unique contact information and basic permissions
  - All users share the default password: User@123

## [0.2.1] - 2025-06-27
### Changed
- Updated admin user credentials
  - Changed admin password for improved security
  - Corrected documentation to specify email login (admin@employdex.com) instead of username

## [0.2.0] - 2025-06-27
### Added
- Implemented Permission Management module frontend components
  - PermissionDetails.js - Component to view permission details with role assignments
  - PermissionEdit.js - Component to edit existing permissions
  - PermissionCreate.js - Component to create new permissions
- Added ActivityLogs component for system activity logging
- Created reusable ConfirmModal component for delete confirmations
- Implemented CSV export functionality for activity logs

### Fixed
- Resolved missing dependencies (react-datepicker)
- Fixed API integration issues in logging components
- Updated API service naming from logAPI to loggingAPI

## [0.1.0] - 2025-06-26
### Added
- Initial project structure setup
- Created Product Requirements Document (PRD)
- Set up Express.js backend structure
- Set up React frontend structure
- Created SQLite database schema design
- Implemented user authentication framework
- Implemented role-based access control system
- Added user management capabilities
- Added role management capabilities
- Created admin dashboard interface
- Created user dashboard interface
