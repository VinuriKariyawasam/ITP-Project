import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

function ServiceReqDash() {
  const [serviceReqs, setServiceReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceReq, setSelectedServiceReq] = useState(null);
  const [deletedServiceReq, setDeletedServiceReq] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/vehicle/serviceReqs"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setServiceReqs(data.serviceReqs);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service request?"
    );
    if (shouldDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/vehicle/delete-serviceReq/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const deletedServiceReq = serviceReqs.find((serviceReq) => serviceReq._id === id);
          setDeletedServiceReq(deletedServiceReq);
          setServiceReqs(serviceReqs.filter((serviceReq) => serviceReq._id !== id));
          setShowModal(true); // Show modal with deleted serviceReq information
        } else {
          console.error("Failed to delete serviceReq");
        }
      } catch (error) {
        console.error("Error deleting serviceReq:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServiceReq(null);
    setFormData({});
    setDeletedServiceReq(null);
  };

  const handleShowUpdateModal = (serviceReq) => {
    setSelectedServiceReq(serviceReq);
    setFormData({
      vehicleNo: serviceReq.vehicleNo,
      date: serviceReq.date,
      name: serviceReq.name,
      issue: serviceReq.issue,
      quotation: serviceReq.quotation,
      request: serviceReq.request,
      report: serviceReq.report,
      status: serviceReq.status,
    });
    setShowModal(true);
  };

  const validate = (name, value) => {
    if (name === "vehicleNo") {
      if (!/^[A-Za-z]{10}$/.test(value.trim())) {
        return "Invalid Vehicle No. Enter again.";
      }
    }
    if (name === "date") {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
          return "Date must not be in the future";
        }
    }
    if (name === "name" && !value.trim()) {
      return "Name is required";
    }
    if (name === "issue" && !value.trim()) {
        return "Issue is required";
    }
    if (name === "quotation") {
        if (!/^\d{20}$/.test(value)) {
          return "Quotation must be 20 digits";
        }
    }
    if (name === "request" && !value.trim()) {
        return "Request is required";
    }
    /*if (name === "status" && !value.trim()) {
        return "Status is required";
    }*/
    return "";
  };

  const handleChange = (name, value) => {
    const error = validate(name, value);

    if (error) {
      alert(error);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicle/update-serviceReq/${selectedServiceReq._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedServiceReqs = serviceReqs.map((serviceReq) => {
          if (serviceReq._id === selectedServiceReq._id) {
            return { ...serviceReq, ...formData };
          }
          return serviceReq;
        });
        setServiceReqs(updatedServiceReqs);
        setShowModal(false);
      } else {
        console.error("Failed to update serviceReq");
      }
    } catch (error) {
      console.error("Error updating serviceReq:", error);
    }
  };

  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="success">
              <Link
                to="/staff/supervisor/serviceReq/add"
                className="text-dark text-decoration-none font-weight-bold"
              >
                Add Service Request
              </Link>
            </Button>
          </div>
        </Stack>
      </Row>
      <div className="mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Issue</th>
                <th>Quotation</th>
                <th>Diagnosis Request</th>
                <th>Diagnosis Report</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceReqs.map((serviceReq, index) => (
                <tr key={index}>
                  <td>{serviceReq.vehicleNo}</td>
                  <td>{serviceReq.date}</td>
                  <td>{serviceReq.name}</td>
                  <td>{serviceReq.issue}</td>
                  <td>{serviceReq.quotation}</td>
                  <td>{serviceReq.request}</td>
                  <td>{serviceReq.report}</td>
                  <td>{serviceReq.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowUpdateModal(serviceReq)}
                      className="btn btn-warning me-2 text-dark font-weight-bold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(serviceReq._id)}
                      className="btn btn-danger text-dark font-weight-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {deletedServiceReq ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Service Request Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vehicle No: {deletedServiceReq.vehicleNo}</p>
              <p>Date: {deletedServiceReq.date}</p>
              <p>Name: {deletedServiceReq.name}</p>
              <p>Issue: {deletedServiceReq.issue}</p>
              <p>Quotation: {deletedServiceReq.quotation}</p>
              <p>Diagnosis Request: {deletedServiceReq.request}</p>
              <p>Diagnosis Report: {deletedServiceReq.report}</p>
              <p>Status: {deletedServiceReq.status}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Service Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formVehicleNo">
                  <Form.Label>Vehicle No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBrand">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIssue">
                  <Form.Label>Issue</Form.Label>
                  <Form.Control
                    type="text"
                    name="issue"
                    value={formData.year}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuotation">
                  <Form.Label>Quotation</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Rs.</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="quotation"
                      value={formData.quotation}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRequest">
                  <Form.Label>Diagnosis Request</Form.Label>
                  <Form.Control
                    type="text"
                    name="request"
                    value={formData.request}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formReport">
                  <Form.Label>Diagnosis Report</Form.Label>
                  <Form.Control
                    type="text"
                    name="report"
                    value={formData.report}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ServiceReqDash;
