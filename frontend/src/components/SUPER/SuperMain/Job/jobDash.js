import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function formatDateFromISO(isoDateString) {
  const date = new Date(isoDateString);
  return date.toISOString().split("T")[0];
}

const JobDash = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/sm/jobs`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received jobs data:", data);
          const updatedJobs = data.map((job) => ({
            ...job,
            jobStatus: "Yet to Start",
          }));
          setJobs(updatedJobs);
        } else {
          throw new Error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        toggleLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const fetchTechnicianName = async (technicianId) => {
    try {
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/employee/${technicianId}`
      );
      if (response.ok) {
        const data = await response.json();
        return `${data.firstName} ${data.lastName}`;
      } else {
        throw new Error("Failed to fetch technician");
      }
    } catch (error) {
      console.error("Error fetching technician:", error);
      return "Unknown Technician";
    } finally {
    }
  };

  const handleStartJob = async (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job._id === jobId ? { ...job, jobStatus: "Ongoing" } : job
    );
    setJobs(updatedJobs);
  };

  const handleCompleteJob = async (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job._id === jobId ? { ...job, jobStatus: "Completed" } : job
    );
    setJobs(updatedJobs);
  };

  useEffect(() => {
    const loadJobsWithTechnicians = async () => {
      if (jobs.length > 0) {
        const updatedJobs = await Promise.all(
          jobs.map(async (job) => {
            const technicianName = await fetchTechnicianName(job.technician);
            return { ...job, technicianName };
          })
        );
        setJobs(updatedJobs);
      }
    };

    loadJobsWithTechnicians();
  }, [jobs]);

  const handleCreateNewJob = () => {
    navigate("/staff/supervisor/jobs/add");
  };

  const handleDownloadAssignedJobs = () => {
    const doc = new jsPDF();
    const tableRows = [];

    // Push table header
    const headers = ["Date", "Task", "Technician", "Status"];
    tableRows.push(headers);

    // Push table data
    jobs.forEach((job) => {
      const rowData = [
        formatDateFromISO(job.date),
        job.task,
        job.technicianName,
        job.jobStatus,
        // Include vehicleNumber in the PDF
      ];
      tableRows.push(rowData);
    });

    // Set table styling
    doc.autoTable({
      head: [headers],
      body: tableRows,
    });

    // Save PDF
    doc.save("assigned_jobs.pdf");
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Scheduled Jobs</h2>
      <Button variant="primary" onClick={handleCreateNewJob} className="mb-3">
        Create New Job
      </Button>
      <Button
        variant="info"
        onClick={handleDownloadAssignedJobs}
        className="mb-3 ms-3"
      >
        Download Assigned Jobs (PDF)
      </Button>
      <Table striped bordered hover id="jobsTable">
        <thead>
          <tr>
            <th>Date</th>
            {/* New field */}
            <th>Task</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id}>
                <td>{formatDateFromISO(job.date)}</td>
                {/* Display vehicleNumber */}
                <td>{job.task}</td>
                <td>{job.technicianName}</td>
                <td>{job.jobStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No jobs available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default JobDash;
