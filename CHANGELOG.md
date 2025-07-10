## [Unreleased]

### 2025-07-10
- Added `proxy` configuration to `frontend/package.json` to forward API requests to Express backend on port 5000. This resolves 404 errors for `/api` requests from React development server.

### Added
- Feature Toggle system: backend API (CRUD, admin/full_access only), DB migration, and frontend admin UI for managing feature flags.
### Fixed
- ActivityLogList: Timestamp now always displays in a readable format using formatTimestamp utility.
- ActivityLogList: Added 'IP Address / Port' column to activity log table. Now displays the source IP/port for each activity log if available.

### Fixed
- Fixed JSX syntax errors in `frontend/src/components/roles/RoleList.js`, specifically the missing or mismatched `<tr>` closing tag and incorrect button/action JSX structure, which caused rendering issues on the Roles List page.

### Improved
- Enhanced the Role Management table UI in `RoleList.js` for better clarity and aesthetics: improved alignment, better action buttons, permission badge wrapping, and custom styles for a modern look.

### Changed
- Role List: Replaced the "View role" action in the Actions column with an "Edit Role" action. The button now navigates to the edit role page and uses the edit icon with text for clarity.

