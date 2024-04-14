const express = require('express');
const router = express.Router();
const Attendance = require('../../models/hr/attendanceModel');
const Leaves = require('../../models/hr/leavesModel');

// Define a route to manually trigger the task
router.get('/manualTask', async (req, res) => {
    try {
        // Get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Find attendance records for yesterday
        const yesterdayAttendance = await Attendance.findOne({ date: yesterday });

        if (!yesterdayAttendance) {
            return res.status(404).json({ message: 'No attendance records found for yesterday.' });
        }

        // Filter employee IDs that were absent yesterday
        const absentEmployees = yesterdayAttendance.employeeAttendance.filter(employee => !employee.value);
        const absentEmployeeDBIds = absentEmployees.map(employee => employee.empDBId);

        // Find leaves that cover yesterday
        const leavesForYesterday = await Leaves.find({
            empDBId: { $in: absentEmployeeDBIds },
            fromDate: { $lte: yesterday },
            toDate: { $gte: yesterday }
        });

        // Extract employee IDs from leaves for yesterday
        const leavesEmployeeDBIds = leavesForYesterday.map(leave => leave.empDBId);

        // Find employees who were absent but did not have leave yesterday
        const absentWithoutLeave = absentEmployeeDBIds.filter(empDBId => !leavesEmployeeDBIds.includes(empDBId));

        return res.status(200).json({ absentWithoutLeave });

    } catch (error) {
        console.error('Error in manual task execution:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
