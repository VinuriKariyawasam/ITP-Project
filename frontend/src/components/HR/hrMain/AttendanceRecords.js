import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs, Modal } from "react-bootstrap";
import AttendanceRecordsTable from "./AttendanceRecordTable";

function AttendanceRecords({ toggleLoading }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Assume attendanceRecords is fetched from the database

  useEffect(() => {
    // Fetch attendance records from the backend when the component mounts
    const fetchAttendanceRecords = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/attendance`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);

        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchAttendanceRecords();
  }, []);

  // Function to check if a date is within the current week
  const isWithinThisWeek = (date) => {
    date = new Date(date);
    const today = new Date();
    const clonedToday = new Date(today.getTime()); // Clone today's date

    // First day of the week (Sunday)
    const firstDayOfWeek = new Date(
      clonedToday.setDate(clonedToday.getDate() - clonedToday.getDay())
    );

    // Last day of the week (Saturday)
    const lastDayOfWeek = new Date(
      clonedToday.setDate(clonedToday.getDate() - clonedToday.getDay() + 6)
    );

    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    firstDayOfWeek.setHours(0, 0, 0, 0);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    // Set the time of the target date to compare within the same range
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= firstDayOfWeek && targetDate <= lastDayOfWeek;
  };

  // Function to check if a date is within the current month
  const isWithinThisMonth = (date) => {
    date = new Date(date);
    const today = new Date();
    const targetDate = new Date(date);
    return (
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getFullYear() === today.getFullYear()
    );
  };

  // Function to get the week range
  const getWeekRange = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    return `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`;
  };

  // Function to get the month and year
  const getMonthYear = () => {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <section>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "15px" }}>
          <Tabs defaultActiveKey="all" id="employeeAttendance">
            <Tab eventKey="all" title="All Records">
              {/* Table to display all attendance records */}
              <AttendanceRecordsTable
                attendRecords={attendanceRecords}
                dateFilter={() => true}
                tableName={`All Attendance Records`}
                toggleLoading={toggleLoading}
              />
            </Tab>
            {/* This Week Subtab */}
            <Tab eventKey="thisWeek" title="This Week">
              {/* Table to display attendance records within the current week */}
              <AttendanceRecordsTable
                attendRecords={attendanceRecords}
                dateFilter={isWithinThisWeek}
                tableName={`Attendance Records for ${getWeekRange()}`}
                toggleLoading={toggleLoading}
              />
            </Tab>
            {/* This Month Subtab */}
            <Tab eventKey="thisMonth" title="This Month">
              {/* Table to display attendance records within the current month */}
              <AttendanceRecordsTable
                attendRecords={attendanceRecords}
                dateFilter={isWithinThisMonth}
                tableName={`Attendance Records for ${getMonthYear()}`}
                toggleLoading={toggleLoading}
              />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </section>
  );
}

export default AttendanceRecords;
