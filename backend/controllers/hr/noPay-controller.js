const Attendance = require("../../models/hr/attendanceModel");
const Leaves = require("../../models/hr/leavesModel");
const Salary = require("../../models/hr/salaryModel");
const NoPayLogs = require("../../models/hr/noPayLogModel");

class NoPayController {
  async getAbsentEmployeesWithoutLeave(req, res) {
    try {
      console.log(
        "Executing manual task to find absent employees without leave"
      );
      // Get yesterday's date
      const startOfYesterday = new Date();
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      startOfYesterday.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of yesterday

      const endOfYesterday = new Date();
      endOfYesterday.setDate(endOfYesterday.getDate() - 1);
      endOfYesterday.setHours(23, 59, 59, 999); // Set hours, minutes, seconds, and milliseconds to the end of yesterday

      const yesterdayAttendance = await Attendance.findOne({
        date: { $gte: startOfYesterday, $lte: endOfYesterday },
      });

      if (!yesterdayAttendance) {
        console.log("No attendance record found for yesterday");
      }

      // Filter employee IDs that were absent yesterday
      const absentEmployees = yesterdayAttendance.employeeAttendance.filter(
        (employee) => !employee.value
      );
      const absentEmployeeDBIds = absentEmployees.map(
        (employee) => employee.empDBId
      );

      const leavesForYesterday = await Leaves.find({
        empDBId: { $in: absentEmployeeDBIds },
        fromDate: { $lte: startOfYesterday },
        toDate: { $gte: endOfYesterday },
        status: "Approved", // Include only leaves with status "Approved"
      });

      // Extract employee IDs from leaves for yesterday
      const leavesEmployeeDBIds = leavesForYesterday.map(
        (leave) => leave.empDBId
      );

      // Find employees who were absent but did not have leave yesterday
      const absentWithoutLeave = absentEmployeeDBIds.filter(
        (empDBId) => !leavesEmployeeDBIds.includes(empDBId)
      );

      // Update noPay for employees found in Salary model
      for (const empDBId of absentWithoutLeave) {
        const salaryRecord = await Salary.findOne({ empDBId });
        if (salaryRecord) {
          salaryRecord.noPay += 500; // Increment noPay by 500
          await salaryRecord.save(); // Save the updated record
        }
      }

      // Create a new instance of the NoPayLogs model
      const logEntry = new NoPayLogs({
        date: new Date(), // Current date
        status: "Success", // Status of the operation
        absentWithoutLeave: absentWithoutLeave.map((empDBId) => ({ empDBId })), // List of absent employees without leave
      });

      // Save the log entry to the database
      const logResult = await logEntry.save();

      console.log("Log entry saved successfully.");

      return res.status(200).json({ logResult });
    } catch (error) {
      console.error("Error in manual task execution:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getLogsForToday(req, res) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of next day

      const logs = await NoPayLogs.find({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      res.status(200).json(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllRecords(req, res) {
    try {
      const records = await NoPayLogs.find();
      res.status(200).json(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new NoPayController();
