import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import AttendanceNav from '../components/attendance/AttendanceNav';
import TeacherDashboard from '../components/attendance/TeacherDashboard';
import StudentDashboard from '../components/attendance/StudentDashboard';

const AttendancePage = () => {
  const { currentUser } = useAuth();
  const isTeacher = currentUser?.role === 'teacher' || currentUser?.role === 'admin';

  // Redirect to appropriate dashboard based on role
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: '/attendance' }} replace />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AttendanceNav />
      <Routes>
        <Route 
          path="student" 
          element={isTeacher ? <Navigate to="/attendance/teacher" replace /> : <StudentDashboard />} 
        />
        <Route 
          path="teacher" 
          element={isTeacher ? <TeacherDashboard /> : <Navigate to="/attendance/student" replace />} 
        />
        <Route 
          index 
          element={
            isTeacher ? 
            <Navigate to="/attendance/teacher" replace /> : 
            <Navigate to="/attendance/student" replace />
          } 
        />
      </Routes>
    </Box>
  );
};

export default AttendancePage;
