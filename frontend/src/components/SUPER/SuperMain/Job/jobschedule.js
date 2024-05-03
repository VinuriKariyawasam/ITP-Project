import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const JobSchedulerForm = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    selectDate: '',
    selectTask: ['Service',],
    selectTechnician: '',
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/hr/today-emp`);
        if (response.ok) {
          const data = await response.json();
          // Filter employees to get only technicians
          const techniciansData = data.employees.filter(emp => emp.position === "Technician");
          setTechnicians(techniciansData);
        } else {
          throw new Error("Failed to fetch technicians");
        }
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
      finally{
        toggleLoading(false);
      }
    };
  
    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData); // Check formData before sending the request

    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/assign-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: formData.selectDate,
          task: formData.selectTask,
          technician: formData.selectTechnician,
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert("Job Created successfully!");
        // Reset form fields or show success message
        navigate("/staff/supervisor/jobs/");
      } else {
        console.error('Failed to submit assigning job');
        // Handle failure (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error submitting assigning job:', error);
      // Handle error (e.g., show error message to user)
    }
    finally{
      toggleLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="job-scheduler-container">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6}>
          <h2 className="text-center mb-4">Job Scheduler</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="selectDate">
              <Form.Label>Select Date:</Form.Label>
              <Form.Control
                type="date"
                name="selectDate"
                value={formData.selectDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
          {/*vehicle number field*/}

            <Form.Group controlId="selectTask">
              <Form.Label>Select Task:</Form.Label>
              <Form.Control
                as="select"
                name="selectTask"
                value={formData.selectTask}
                onChange={handleInputChange}
                required
              >
                <option value="Service">Vehicle Service Appointment</option>
                <option value="testRun">Test Run</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="selectTechnician">
  <Form.Label>Select Technician:</Form.Label>
  <Form.Control
    as="select"
    name="selectTechnician"
    value={formData.selectTechnician}
    onChange={handleInputChange}
    required
  >
    {technicians.length > 0 ? (
      technicians.map((technician) => (
        <option key={technician._id} value={technician._id}>
          {technician.firstName} {technician.lastName}
        </option>
      ))
    ) : (
      <option value="">No Technicians Available</option>
    )}
  </Form.Control>
</Form.Group>


            <Button variant="primary" type="submit" className="mt-3 w-100">
              Assign Job
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default JobSchedulerForm;