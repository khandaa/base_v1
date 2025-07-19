# Attendance Management System

This document provides information about the Attendance Management System integrated into the EmployDEX Base Platform.

## Features

- **Teacher Dashboard**
  - Generate attendance codes for classes
  - View class attendance records
  - Track student attendance history

- **Student Dashboard**
  - Mark attendance using codes
  - View personal attendance history
  - Check attendance status for different classes

## Setup Instructions

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Run database migrations:
   ```bash
   npm run migrate
   ```

3. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Attendance

- `POST /api/attendance/generate-code`
  - Teacher only
  - Generates a new attendance code for a class
  - Body: `{ "classId": number, "expiresInMinutes": number }`

- `POST /api/attendance/mark`
  - Student only
  - Marks attendance using a code
  - Body: `{ "classId": number, "code": string }`

- `GET /api/attendance/class/:classId`
  - Teacher only
  - Gets attendance records for a class
  - Query params: `?date=YYYY-MM-DD` (optional)

- `GET /api/attendance/student`
  - Student only
  - Gets the student's attendance records
  - Query params: `classId` (optional)

## Database Schema

### Tables

1. **classes**
   - id (PK)
   - name
   - description
   - teacher_id (FK to users)
   - created_at
   - updated_at

2. **attendance_records**
   - id (PK)
   - class_id (FK to classes)
   - student_id (FK to users)
   - date
   - status (present/absent/late/excused)
   - marked_at
   - attendance_code

3. **class_enrollments**
   - id (PK)
   - class_id (FK to classes)
   - student_id (FK to users)
   - enrolled_at

4. **attendance_codes**
   - id (PK)
   - class_id (FK to classes)
   - code
   - expires_at
   - created_by (FK to users)
   - created_at

## Permissions

- `attendance_view` - View attendance records
- `attendance_manage` - Manage attendance (generate codes, mark attendance)

## Roles

### Teacher
- Can generate attendance codes
- Can view class attendance
- Can manage attendance records

### Student
- Can mark attendance using codes
- Can view own attendance history

## Troubleshooting

### Database Issues
- If you encounter database errors, try deleting the database file and running migrations again
- Make sure the `db` directory has write permissions

### Authentication Issues
- Ensure JWT tokens are being sent with requests
- Check that users have the correct roles/permissions

### Frontend Issues
- Clear browser cache if UI doesn't update
- Check browser console for errors

## License

This project is licensed under the MIT License.
