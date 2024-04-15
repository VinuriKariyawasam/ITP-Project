const Attendance = require("../../models/hr/attendanceModel");
const ArchivedAttendance = require("../../models/hr/archiveAttendanceModel");

class AttendanceController {
  async createAttendance(req, res) {
    try {
      const { date, time, employeeAttendance } = req.body;
      const newAttendance = new Attendance({ date, time, employeeAttendance });
      const savedAttendance = await newAttendance.save();
      res.status(201).json(savedAttendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to create attendance" });
    }
  }

  async getAllAttendance(req, res) {
    try {
      const allAttendance = await Attendance.find();
      res.status(200).json(allAttendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  }

  async getAttendanceById(req, res) {
    try {
      const { id } = req.params;
      const attendance = await Attendance.findById(id);
      if (!attendance) {
        return res.status(404).json({ error: "Attendance not found" });
      }
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  }

  async archiveAttendance(req, res) {
    try {
      const { id } = req.params;
      const attendance = await Attendance.findById(id);
      if (!attendance) {
        return res.status(404).json({ error: "Attendance not found" });
      }
      const archivedAttendance = new ArchivedAttendance(attendance.toJSON());
      await archivedAttendance.save();
      await Attendance.findByIdAndDelete(id);
      res.status(200).json({ message: "Attendance archived successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to archive attendance" });
    }
  }

  async getAttendanceByDate(req, res) {
    try {
      const { date } = req.params;
      const isoDate = new Date(date); // Convert input date to ISODate format
      const attendance = await Attendance.find({
        date: {
          $gte: isoDate,
          $lt: new Date(isoDate.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      res.status(200).json(attendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  }

  async updateAttendance(req, res) {
    try {
      const { date, time, employeeAttendance } = req.body;
      const attendanceId = req.params.id;

      // Find the attendance record by ID
      const attendance = await Attendance.findById(attendanceId);

      if (!attendance) {
        return res.status(404).json({ error: "Attendance record not found" });
      }

      // Update the attendance record fields
      attendance.date = date;
      attendance.time = time;
      attendance.employeeAttendance = employeeAttendance;

      // Save the updated record
      const updatedAttendance = await attendance.save();

      res.json(updatedAttendance);
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ error: "Failed to update attendance" });
    }
  }
}

module.exports = new AttendanceController();
