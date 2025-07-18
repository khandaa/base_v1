const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Generate attendance code (Teacher only)
router.post('/generate-code', authenticateToken, authorizeRoles(['teacher', 'admin']), async (req, res) => {
    try {
        const { classId, expiresInMinutes = 15 } = req.body;
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
        const code = uuidv4().substring(0, 6).toUpperCase();
        
        await db.run(
            'INSERT INTO attendance_codes (class_id, code, expires_at, created_by) VALUES (?, ?, ?, ?)',
            [classId, code, expiresAt.toISOString(), req.user.id]
        );
        
        res.json({ 
            success: true, 
            code, 
            expiresAt,
            message: 'Attendance code generated successfully'
        });
    } catch (error) {
        console.error('Error generating attendance code:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Mark attendance (Student)
router.post('/mark', authenticateToken, authorizeRoles(['student']), async (req, res) => {
    try {
        const { classId, code } = req.body;
        const studentId = req.user.id;
        const today = new Date().toISOString().split('T')[0];
        
        // Verify attendance code
        const validCode = await db.get(
            'SELECT * FROM attendance_codes WHERE code = ? AND class_id = ? AND expires_at > datetime("now")',
            [code, classId]
        );
        
        if (!validCode) {
            return res.status(400).json({ success: false, message: 'Invalid or expired attendance code' });
        }
        
        // Check if already marked
        const existing = await db.get(
            'SELECT * FROM attendance_records WHERE class_id = ? AND student_id = ? AND date = ?',
            [classId, studentId, today]
        );
        
        if (existing) {
            return res.status(400).json({ success: false, message: 'Attendance already marked for today' });
        }
        
        // Mark attendance
        await db.run(
            'INSERT INTO attendance_records (class_id, student_id, date, status, attendance_code) VALUES (?, ?, ?, ?, ?)',
            [classId, studentId, today, 'present', code]
        );
        
        res.json({ success: true, message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get class attendance (Teacher)
router.get('/class/:classId', authenticateToken, authorizeRoles(['teacher', 'admin']), async (req, res) => {
    try {
        const { classId } = req.params;
        const { date } = req.query;
        
        let query = `
            SELECT u.id, u.name, u.email, ar.date, ar.status, ar.marked_at
            FROM users u
            JOIN class_enrollments ce ON u.id = ce.student_id
            LEFT JOIN attendance_records ar ON u.id = ar.student_id AND ar.class_id = ?
            WHERE ce.class_id = ?
        `;
        
        const params = [classId, classId];
        
        if (date) {
            query += ' AND ar.date = ?';
            params.push(date);
        }
        
        const attendance = await db.all(query, params);
        
        res.json({ success: true, data: attendance });
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get student attendance (Student)
router.get('/student', authenticateToken, authorizeRoles(['student']), async (req, res) => {
    try {
        const studentId = req.user.id;
        const { classId } = req.query;
        
        let query = `
            SELECT ar.*, c.name as class_name
            FROM attendance_records ar
            JOIN classes c ON ar.class_id = c.id
            WHERE ar.student_id = ?
        `;
        
        const params = [studentId];
        
        if (classId) {
            query += ' AND ar.class_id = ?';
            params.push(classId);
        }
        
        query += ' ORDER BY ar.date DESC';
        
        const attendance = await db.all(query, params);
        
        res.json({ success: true, data: attendance });
    } catch (error) {
        console.error('Error fetching student attendance:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
