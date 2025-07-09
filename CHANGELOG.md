# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
