import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Badge from "react-bootstrap/Badge";

function ServiceReqDash({ toggleLoading }) {
  const [serviceReqs, setServiceReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceReq, setSelectedServiceReq] = useState(null);
  const [deletedServiceReq, setDeletedServiceReq] = useState(null);

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [reportUrl, setReportUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message
  const [reportFilePath, setReportFilePath] = useState("");
  const location = useLocation();
  const [formData, setFormData] = useState({
    status: "pending", // Set default status to "pending"
  });

  useEffect(() => {
    const fetchDataAndReportUrl = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/vehicle/serviceReqs`);
        if (response.ok) {
          const data = await response.json();
          const serviceReqs = data.serviceReqs || [];
          // Map each service request and set its status to "pending"
          const updatedServiceReqs = serviceReqs.map(serviceReq => ({
            ...serviceReq,
            status: "pending"
          }));
          setServiceReqs(updatedServiceReqs);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch data");
        }
  
        const queryParams = new URLSearchParams(location.search);
        const reportUrl = queryParams.get("reportUrl");
        setReportUrl(reportUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
  
    fetchDataAndReportUrl();
  }, [location.search]);
  

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service request?"
    );
    if (shouldDelete) {
      try {
        toggleLoading(true);
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/vehicle/delete-serviceReq/${id}`,
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
          setServiceReqs(
            serviceReqs.filter((serviceReq) => serviceReq._id !== id)
          );
          setShowModal(true);
        } else {
          throw new Error("Failed to delete serviceReq");
        }
      } catch (error) {
        console.error("Error deleting serviceReq:", error);
        setError("Failed to delete service request. Please try again later.");
      }finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServiceReq(null);
    setFormData({});
    setDeletedServiceReq(null);
    setSuccessMessage(""); // Clear success message when modal is closed
  };

  const handleShowUpdateModal = (serviceReq) => {
    setSelectedServiceReq(serviceReq);
    setFormData({
      vehicleNo: serviceReq.vehicleNo,
      date: serviceReq.date,
      name: serviceReq.name,
      issue: serviceReq.issue,
      request: serviceReq.request,
      report: serviceReq.report,

      reportFileName: serviceReq.reportFileName,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validate each field as it's being typed
    switch (name) {
      case "vehicleNo":
        errorMessage =
          value.trim().length === 0 || value.trim().length > 10
            ? "Vehicle No. is required and must be at most 10 characters"
            : "";
        break;
      case "date":
        errorMessage = !value ? "Date is required" : "";
        break;
      case "name":
      case "issue":
      case "request":

        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only letters`
          : "";
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          report: reader.result,
          reportFileName: fileName,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/vehicle/update-serviceReq/${selectedServiceReq._id}`,
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
        setSuccessMessage("Updated successfully"); // Set success message
      } else {
        throw new Error("Failed to update serviceReq");
      }
    } catch (error) {
      console.error("Error updating serviceReq:", error);
      setError("Failed to update service request. Please try again later.");
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };


  const handleDownload = async (reportFilePath, reportFileName) => {
    try {
      toggleLoading(true);
      // Make an HTTP GET request to download the file
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/vehicle/download-report/${reportFilePath}`, {
        method: 'GET',
      });
  
      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      
      // Set the filename to the original filename
      link.setAttribute('download', reportFileName);
  
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      // Handle error
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  
  



  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by vehicle No..."
                value={search}
                onChange={handleSearch}
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="secondary" onClick={clearFilters}>
              Clear Search
            </Button>
          </div>
          <div className="p-2 ms-auto">
            <Button
              variant="success"
              style={{
                backgroundColor: "#9D9BE1",
                border: "1px solid #9D9BE1",
              }}
            >
              <Link
                to="/staff/supervisor/serviceReq/add"
                className="text-dark text-decoration-none"
                style={{
                  color: "#9D9BE1",
                  fontWeight: "bold",
                }}
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
                <th style={{ width: "10%" }}>Vehicle No</th>
                <th style={{ width: "10%" }}>Date</th>
                <th style={{ width: "10%" }}>Name</th>
                <th style={{ width: "10%" }}>Issue</th>
                <th style={{ width: "10%" }}>Quotation</th>
                <th style={{ width: "15%" }}>Diagnosis Request</th>
                <th style={{ width: "15%" }}>Diagnosis Report</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {console.log(serviceReqs)}
              {serviceReqs
                .filter((serviceReq) =>
                  serviceReq.vehicleNo
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((serviceReq, index) => (
                  <tr key={index}>
                    <td>{serviceReq.vehicleNo}</td>
                    <td>{serviceReq.date}</td>
                    <td>{serviceReq.name}</td>
                    <td>{serviceReq.issue}</td>
                    <td>
  <Link
    to={`/staff/supervisor/quotation`}
    className="btn"
    style={{
      backgroundColor: "#d3d3d3",
      borderColor: "#d3d3d3",
      color: "#000",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    More
  </Link>
</td>

                    <td>{serviceReq.request}</td>
                    <td>
                    <Button
  variant="primary"
>
  <a href={serviceReq.reportUrl} download={serviceReq.reportFileName}>
    Download
  </a>
</Button>




                    </td>
                    
                    <td>
  {serviceReq.status === "pending" ? (
    <Badge bg="warning">pending</Badge>
  ) : (
    // Render other status or default content if needed
    <Badge>{serviceReq.status}</Badge>
  )}
</td>
                    <td>
                      <button
                        onClick={() => handleShowUpdateModal(serviceReq)}
                        className="btn btn-warning me-2 text-dark font-weight-bold"
                        style={{
                          backgroundColor: "#F5EF7C",
                          fontWeight: "bold",
                        }}
                      >
                        Update
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(serviceReq._id)}
                        className="btn btn-danger text-dark"
                        style={{
                          fontWeight: "bold",
                          color: "#F78E79",
                          marginTop: "10px",
                        }}
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
                    onChange={handleChange}
                    isInvalid={errors.vehicleNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vehicleNo}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIssue">
                  <Form.Label>Issue</Form.Label>
                  <Form.Control
                    type="text"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    isInvalid={errors.issue}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.issue}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRequest">
                  <Form.Label>Diagnosis Request</Form.Label>
                  <Form.Control
                    type="text"
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    isInvalid={errors.request}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.request}
                  </Form.Control.Feedback>
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