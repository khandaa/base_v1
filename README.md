# EmployDEX Base Platform

A foundational system providing essential user management capabilities, including user registration, authentication, role-based access control, and an administrative dashboard.

## Project Structure

```
base_v1/
├── backend/             # Express.js API
│   ├── config/          # Configuration files
│   ├── controllers/     # API route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
│
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/             # Source files
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── utils/       # Utility functions
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json     # Frontend dependencies
│
├── database/            # SQLite database
│   └── migrations/      # Database migrations
│
├── base_v1.MD           # Project PRD
├── CHANGELOG.md         # Project changelog
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Features

- User registration and authentication with JWT
- Role-based access control (RBAC) system
- User dashboard with activity metrics
- Administrative interface with comprehensive controls
- User, role, and permission management
- System activity logging and monitoring
- Permission-based UI components

## Technology Stack

- **Backend**: Express.js
- **Frontend**: React.js
- **Database**: SQLite
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run start
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

### Default Admin Credentials

- Email: admin@employdex.com
- Mobile/Username: 9999999999
- Password: Admin@123

The admin user has full permissions to manage users, roles, and permissions in the system.

**Note:** The login has been updated to accept either email or mobile number. You can log in with either credential.

### Demo Users

The following demo users are available with the standard "User" role:

1. John Doe (john.doe@employdex.com)
2. Jane Smith (jane.smith@employdex.com)
3. Robert Johnson (robert.johnson@employdex.com)
4. Emily Williams (emily.williams@employdex.com)
5. Michael Brown (michael.brown@employdex.com)

All demo users share the password: User@123

## Database Structure

Refer to the PRD (`base_v1.MD`) for detailed database structure information.

## License

[MIT](https://choosealicense.com/licenses/mit/)
