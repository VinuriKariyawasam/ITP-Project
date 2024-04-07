import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          const deletedServiceReq = serviceReqs.find(
            (serviceReq) => serviceReq._id === id
          );
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
      reportFileName: serviceReq.reportFileName // Set reportFileName here
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, report: reader.result, reportFileName: fileName });
      };
      reader.readAsDataURL(file);
    }
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

  const viewReport = (report) => {
    try {
      const blob = b64toBlob(report, 'application/pdf');
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error('Error viewing report:', error);
    }
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
            <Button variant="success" style={{ backgroundColor: '#9D9BE1', border: '1px solid #9D9BE1' }}>
              <Link
                to="/staff/supervisor/serviceReq/add"
                className="text-dark text-decoration-none"
                style={{ color: '#9D9BE1', fontWeight: 'bold' }}
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
                <th style={{ width: '10%' }}>Vehicle No</th>
                <th style={{ width: '10%' }}>Date</th>
                <th style={{ width: '10%' }}>Name</th>
                <th style={{ width: '10%' }}>Issue</th>
                <th style={{ width: '10%' }}>Quotation</th>
                <th style={{ width: '15%' }}>Diagnosis Request</th>
                <th style={{ width: '15%' }}>Diagnosis Report</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '10%' }}>Actions</th>
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
                  <td>
                    {serviceReq.reportFileName && (
                      <button
                        onClick={() => viewReport(serviceReq.report)}
                        className="btn btn-link"
                      >
                        {serviceReq.reportFileName}
                      </button>
                    )}
                  </td>
                  <td>{serviceReq.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowUpdateModal(serviceReq)}
                      className="btn btn-warning me-2 text-dark font-weight-bold"
                      style={{ backgroundColor: '#F5EF7C', fontWeight: 'bold' }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(serviceReq._id)}
                      className="btn btn-danger text-dark"
                      style={{ fontWeight: 'bold', color: '#F78E79' }}
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
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => handleChange("date", date)}
                    className="form-control"
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
                    value={formData.issue}
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
                    type="file"
                    name="report"
                    accept=".pdf"
                    onChange={handleFileChange}
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
