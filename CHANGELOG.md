# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
