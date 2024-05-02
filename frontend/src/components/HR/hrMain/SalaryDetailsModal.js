import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Container, Row, Col, Toast } from "react-bootstrap";
import UpdateSalaryModal from "./SalaryUpdateModal";
import html2pdf from "html2pdf.js";
import logo from "../../../images/logoblack_trans.png";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

function SalaryDetailsModal({ show, handleClose, id, toggleLoading }) {
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [key, setKey] = useState(0); // Initialize key with 0

  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [toastType, setToastType] = useState("");

  const { userId, userPosition } = useContext(StaffAuthContext);

  // Function to show toast notification
  const showToastNotification = (type, header, body) => {
    setToastType(type);
    setToastHeader(header);
    setToastBody(body);
    setShowToast(true);
  };
  const handleUpdate = async (updatedData) => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/update-salaries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedDetails = await response.json();
      console.log("Updated salary details:", updatedDetails);
      if (!updatedDetails) {
        throw new Error("Invalid response from server");
      }

      setSalaryDetails(updatedDetails); // Update salaryDetails directly
      console.log("Updated salary details status:", salaryDetails);

      setUpdateModalShow(false); // Close the update modal
      //alert("Salary details updated successfully");
      setToastType("success");
      setToastHeader("Success");
      setToastBody("Salary updated successfully");
      setShowToast(true);

      setKey((prevKey) => prevKey + 1); // Update the key to force a re-render
    } catch (error) {
      console.error("Error updating salary:", error);
      setToastType("error");
      setToastHeader("Error");
      setToastBody("Error deleting leave record");
      setShowToast(true);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  const generatePDF = () => {
    const element = document.getElementById("salary-details-container");
    if (!element) {
      console.error("Container element not found");
      return;
    }

    // Create a wrapper div
    const wrapper = document.createElement("div");

    // Add the header content
    const headerContent = `
      <div style="padding: 20px;">
        <h4 class="float-end font-size-15">Human Resources</h4>
        <div class="mb-4">
          <img src="${logo}" alt="Invoice Logo" width="200px" />
        </div>
        <div class="text-muted">
        <p class="mb-1"><i class="bi bi-geo-alt-fill"></i>323/1/A Main Street Battaramulla</p>
        <p class="mb-1">
        <i class="bi bi-envelope-fill me-1"></i> info@neotech.com
        </p>
        <p>
        <i class="bi bi-telephone-fill me-1"></i> 0112887998
        </p>

        </div>
        <hr/>
      </div>
    `;
    wrapper.innerHTML = headerContent;

    // Clone the salary details container element
    const clonedElement = element.cloneNode(true);

    // Append both the header and the main content to the wrapper
    wrapper.appendChild(clonedElement);

    // Add authorized by and generated date
    const footerContent = `
      <div style="margin-top: 20px; padding: 20px;">
        <p>Authorized By: ${userPosition}</p>
        <p>Generated Date: ${new Date().toLocaleDateString()}</p>
      </div>
    `;
    wrapper.innerHTML += footerContent;

    // Generate and save the PDF
    html2pdf()
      .from(wrapper)
      .save(`Salary Information of ${salaryDetails.name}.pdf`)
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/salaries/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setSalaryDetails(data);
      } catch (error) {
        console.error("Error fetching salary details:", error);

        handleClose();
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchSalaryDetails();
  }, [id, show, key]);

  //get current date
  const currentDate = new Date().toLocaleDateString();
  return (
    <Modal show={show} onHide={handleClose}>
      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={8000}
        autohide
        style={{
          position: "fixed",
          top: 90,
          right: 20,
          minWidth: 300,
          zIndex: 9999,
        }}
      >
        <Toast.Header closeButton={true} className={`bg-${toastType}`}>
          <strong className="me-auto">{toastHeader}</strong>
        </Toast.Header>
        <Toast.Body className={`bg-${toastType}`}>{toastBody}</Toast.Body>
      </Toast>

      <Modal.Header closeButton>
        <Modal.Title>Salary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {salaryDetails && (
          <Container id="salary-details-container">
            <h3>Salary Information of {salaryDetails.name}</h3>
            <br />
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Employee Id:</strong>
                {salaryDetails.empId}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Position:</strong> {salaryDetails.position}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Name:</strong>
                {salaryDetails.name}
              </Col>
            </Row>
            <br />
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Basic Salary:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.basicSalary
                    ? Number(salaryDetails.basicSalary).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Allowance:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.allowance
                    ? Number(salaryDetails.allowance).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Total Salary:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.totalSal
                    ? Number(salaryDetails.totalSal).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Nopay deductions:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.noPay
                    ? Number(salaryDetails.noPay).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>EPF-8%:</strong>
              </Col>
              <Col
                xs={6}
                md={4}
                className="text-end"
                style={{ borderBottom: "1px solid black" }}
              >
                <strong>
                  Rs.
                  {salaryDetails.EPFE
                    ? Number(salaryDetails.EPFE).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Net Salary:</strong>
              </Col>
              <Col
                xs={6}
                md={4}
                className="text-end"
                style={{ borderBottom: "3px double black" }}
              >
                <strong>
                  Rs.
                  {salaryDetails.netSal
                    ? Number(salaryDetails.netSal).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>EPF-12%:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.EPFC
                    ? Number(salaryDetails.EPFC).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>ETF-3%:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>
                  Rs.
                  {salaryDetails.ETF
                    ? Number(salaryDetails.ETF).toFixed(2)
                    : "0.00"}
                </strong>
              </Col>
            </Row>

            <br />
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Bank:</strong>
                {salaryDetails.bank}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Branch:</strong>
                {salaryDetails.branch}
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Account No:</strong>
                {salaryDetails.account}
              </Col>
            </Row>
            <br />
            <h6 style={{ fontSize: "smaller" }}>
              NEO TECH Motors and Services {currentDate}
            </h6>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setUpdateModalShow(true)}>
          Edit
        </Button>
        <Button variant="secondary" onClick={generatePDF}>
          Generate Report
        </Button>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {/* Update Salary Modal */}
      <UpdateSalaryModal
        show={updateModalShow}
        handleClose={() => setUpdateModalShow(false)}
        salaryDetails={salaryDetails}
        handleUpdate={handleUpdate}
      />
    </Modal>
  );
}

export default SalaryDetailsModal;
