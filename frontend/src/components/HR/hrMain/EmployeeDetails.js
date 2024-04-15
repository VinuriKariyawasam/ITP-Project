import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  Image,
  Modal,
  Card,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import html2pdf from "html2pdf.js";
import LeaveRecordsTable from "./LeaveRecordTable";
import EmployeeUpdateModal from "./EmployeeUpdateModal";
import EmpEvaluateModal from "./EmpEvaluateModal";
import SalaryDetailsModal from "./SalaryDetailsModal";
import MoreReviewsModal from "./MoreReviewModal";
import SystemCredentialsUpdateModal from "./SystemCredentialsUpdateModal";
//import { StaffAuthContext } from "../../../Context/Staff/StaffAuthContext";

function EmployeeDetails() {
  const { employeeId } = useParams();
  //to redirect after success
  const navigate = useNavigate();
  //get token from context
  //const { token } = useContext(StaffAuthContext);
  //states
  const [employee, setEmployee] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [reviews, setReviews] = useState([]); // State to store all reviews
  const [totalReviews, setTotalReviews] = useState([]); // State to store total reviews count
  const [positiveReviews, setPositiveReviews] = useState([]); // State to store positive reviews count
  const [negativeReviews, setNegativeReviews] = useState([]); // State to store negative reviews count
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectedLeaves, setRejectedLeaves] = useState(0);
  const [showLeaveTable, setShowLeaveTable] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [toastType, setToastType] = useState("");

  // Function to show toast notification
  const showToastNotification = (type, header, body) => {
    setToastType(type);
    setToastHeader(header);
    setToastBody(body);
    setShowToast(true);
  };

  //Function to fetch employee personal data by database
  const fetchEmployeeById = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/employee/${employeeId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched employee data from fetch:", data);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return null;
    }
  };

  // Function to fetch bank details from the bank database
  const fetchSalaryDetails = async (employeeId) => {
    try {
      const salaryResponse = await fetch(
        `http://localhost:5000/api/hr/salary/${employeeId}`
      );
      if (!salaryResponse.ok) {
        throw new Error(`HTTP error! Status: ${salaryResponse.status}`);
      }
      const salData = await salaryResponse.json();
      setSalaryDetails(salData);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  // Function to fetch reviews from the reviews database
  const fetchReviews = async (employeeId) => {
    try {
      const reviewsResponse = await fetch(
        "http://localhost:5000/api/hr/emp-reviews"
      );
      if (!reviewsResponse.ok) {
        throw new Error(`HTTP error! Status: ${reviewsResponse.status}`);
      }
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);

      // Filter reviews for the specific employee

      const filteredReviews = reviewsData.filter(
        (review) => review.empDBId === employeeId
      );

      // Calculate total, positive, and negative reviews counts
      const totalReviews = filteredReviews.length;
      const positiveReviews = filteredReviews.filter(
        (review) => review.type === "Positive"
      ).length;
      const negativeReviews = filteredReviews.filter(
        (review) => review.type === "Negative"
      ).length;

      // Set the state with the calculated counts
      setTotalReviews(totalReviews);
      setPositiveReviews(positiveReviews);
      setNegativeReviews(negativeReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Function to fetch leaves from the database
  const fetchLeaves = async (employeeId) => {
    try {
      const leavesResponse = await fetch(
        `http://localhost:5000/api/hr/emp-leaves/${employeeId}`
      );
      if (!leavesResponse.ok) {
        throw new Error(`HTTP error! Status: ${leavesResponse.status}`);
      }
      const leavesData = await leavesResponse.json();
      setLeaves(leavesData);

      // Calculate total, positive, and negative reviews counts
      const totalLeaves = leavesData.length;
      const approvedLeaves = leavesData.filter(
        (leave) => leave.status === "Approved"
      ).length;
      const rejectedLeaves = leavesData.filter(
        (leave) => leave.status === "Rejected"
      ).length;

      // Set the state with the calculated counts
      console.log("Total Leaves:", totalLeaves);
      setTotalLeaves(totalLeaves);
      console.log("Approved Leaves:", approvedLeaves);
      setApprovedLeaves(approvedLeaves);
      console.log("Rejected Leaves:", rejectedLeaves);
      setRejectedLeaves(rejectedLeaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeById(employeeId);
    fetchSalaryDetails(employeeId);
    fetchReviews(employeeId);
    fetchLeaves(employeeId);
  }, [employeeId]);

  /*----Parts regarding rendering employee personal details-------*/
  console.log("Rendering modal with employee data:", employee);
  if (!employee) return null;
  //destructure employee object
  const {
    _id,
    empId,
    firstName,
    lastName,
    birthDate,
    nic,
    address,
    gender,
    contact,
    startDate,
    position,
    otherDetails,
    email,
    password,
    _v,
    photo,
    documents,
    photoUrl,
    documentUrls,
    points,
  } = employee;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  /*----Parts regarding generate pdf from employee personal details-------*/
  const generatePDF = () => {
    const element = document.querySelector(".personalDetails"); // Select the container to convert to PDF
    const opt = {
      margin: 0.5,
      filename: "personal_details.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save(); // Generate and save the PDF
  };

  /*----Parts regarding updating employee personal details-------*/
  //render update modal
  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };
  // Handle update employee data
  const handleUpdateEmployee = async (updatedData) => {
    // Logic to update employee data
    console.log("Updated employee data:", updatedData);
    fetchEmployeeById(employeeId); //this used because of error
    //setEmployee(updatedData); // Update the employee data in the state
    setShowUpdateModal(false); // Close the update modal
    setToastType("success");
    setToastHeader("Success");
    setToastBody("Personal Details Updated Successfully");
    setShowToast(true);
  };

  /*----Parts regarding employee evaluating-------*/
  const handleEvaluateModalClose = () => {
    setShowEvaluateModal(false);
  };

  const handleEvaluateModalShow = () => {
    setShowEvaluateModal(true);
  };

  const handleCreateReview = (formData) => {
    // You can handle the form submission logic here
    console.log(formData);
    // Close the modal after submission
    handleEvaluateModalClose();
    fetchReviews(employeeId);
    fetchEmployeeById(employeeId);
    setToastType("success");
    setToastHeader("Success");
    setToastBody("Add evaluation review successfully");
    setShowToast(true);
  };

  /*----Parts regarding employee archive(delete)-------*/
  const handleDeleteClick = () => {
    // Show confirmation dialog box
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Send DELETE request to backend API using fetch
      await fetch(`http://localhost:5000/api/hr/archive-employee/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required
        },
        // Optionally, include credentials if necessary
        // credentials: 'include',
      });

      // Close the modal
      setShowConfirmDelete(false);

      // Reload the employee page after deletion
      navigate("/staff/hr/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog box
    setShowConfirmDelete(false);
  };

  /*----Parts regarding more salary functions-------*/
  const handleMoreButtonClick = (id) => {
    setSelectedRecordId(id);
    setShowSalaryModal(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowSalaryModal(false);
    fetchSalaryDetails(employeeId);
  };

  /*----Parts regarding more reviews modal-------*/
  // Function to handle opening the modal
  const handleOpenReviewsModal = () => {
    setShowReviewsModal(true);
  };

  // Function to handle closing the modal
  const handleCloseReviewModal = () => {
    setShowReviewsModal(false); // Close the modal
    fetchReviews(employeeId); // Fetch reviews again to update the count
    fetchEmployeeById(employeeId); // Fetch employee data again to update the points
  };

  /*----Parts regarding update credentials modal-------*/
  // Function to show the modal
  const showCredentialsModalHandler = () => {
    setShowCredentialsModal(true);
  };

  // Function to hide the modal
  const hideCredentialsModalHandler = () => {
    setShowCredentialsModal(false);
  };

  const handleCredUpdate = async () => {
    setShowCredentialsModal(false);
    fetchEmployeeById(employeeId);
    setToastType("success");
    setToastHeader("Success");
    setToastBody("Credentials Updated Successfully");
    setShowToast(true);
  };

  return (
    <Card style={{ padding: "20px" }}>
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

      <h2>
        <Button
          variant="dark"
          onClick={() => navigate("/staff/hr/employee")}
          style={{ margin: "10px" }}
        >
          <BsArrowLeft /> Employee
        </Button>
        Employee Details of {firstName} {lastName}
      </h2>
      <hr />
      <Card.Body style={{ padding: "10px" }}>
        <Row>
          <Col md={6}>
            {/* Display Personal Details*/}
            <Container className="personalDetails">
              <h4>Personal Details</h4>
              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={8}>
                  <Image
                    src={photoUrl}
                    rounded
                    style={{ width: "200px", height: "150px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  <strong>Employee Id:</strong> {empId}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={6}>
                  <strong>First Name:</strong> {firstName}
                </Col>
                <Col xs={12} md={6}>
                  <strong>Last Name:</strong> {lastName}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={6}>
                  <strong>Birth Date:</strong> {formatDate(birthDate)}
                </Col>
                <Col xs={12} md={6}>
                  <strong>NIC:</strong> {nic}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  <strong>Address:</strong> {address}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={6}>
                  <strong>Gender:</strong> {gender}
                </Col>
                <Col xs={12} md={6}>
                  <strong>Contact:</strong> {contact}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={6}>
                  <strong>Start Date:</strong> {formatDate(startDate)}
                </Col>
                <Col xs={12} md={6}>
                  <strong>Position:</strong> {position}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                {points && (
                  <Col xs={12} md={6}>
                    <strong>Grading Points:</strong> {points}
                  </Col>
                )}
                {email != "undefined" && (
                  <Col xs={12} md={6}>
                    <strong>Email:</strong> {email}
                  </Col>
                )}
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  <strong>Other Details:</strong>{" "}
                  {otherDetails !== "undefined"
                    ? otherDetails
                    : "No other details"}
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                {documentUrls.length >= 1 && (
                  <Col>
                    <strong>Documents:</strong>
                    <ul>
                      {documentUrls.map((docUrl) => {
                        // Extract the file name from the URL
                        const fileName = docUrl.substring(
                          docUrl.lastIndexOf("/") + 1
                        );

                        return (
                          <li key={docUrl}>
                            <a href={docUrl} target="_blank">
                              {fileName}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                )}
              </Row>
            </Container>
            <hr />
            <Button
              variant="primary"
              onClick={generatePDF}
              style={{ margin: "10px" }}
            >
              Generate PDF
            </Button>
            {/* Personal Details Update Button */}
            <Button
              variant="dark"
              onClick={handleUpdateClick}
              style={{ margin: "10px" }}
            >
              Update Details
            </Button>
            {employee.position != "Technician" && (
              <Button
                variant="dark"
                onClick={showCredentialsModalHandler}
                style={{ margin: "10px" }}
              >
                Update Credentials
              </Button>
            )}
            <Button
              variant="danger"
              onClick={handleDeleteClick}
              style={{ margin: "10px" }}
            >
              Delete
            </Button>
          </Col>
          <Col md={6}>
            {/* Display Salary Details*/}
            <Container className="salaryDetails">
              <h4>Bank & Salary Details</h4>
              <br />
              <br />
              {salaryDetails && ( // Add conditional check here
                <>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col xs={12} md={6}>
                      <strong>Bank:</strong> {salaryDetails.bank}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col xs={12} md={6}>
                      <strong>Branch:</strong> {salaryDetails.branch}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col xs={12} md={6}>
                      <strong>Account No:</strong> {salaryDetails.account}
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
                </>
              )}
              <br />
            </Container>
            <hr />
            {/* More button with onClick handler */}
            <Button
              variant="dark"
              className="d-flex mx-auto"
              onClick={() => handleMoreButtonClick(salaryDetails._id)}
            >
              More
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          {/* Display Salary Details*/}
          <Container>
            <h4>Evaluation Reviews</h4>
            <Row>
              <Col>
                <h5 style={{ margin: "10px" }}>Total Reviews:{totalReviews}</h5>
              </Col>
              <Col>
                <h5 style={{ margin: "10px" }}>
                  Positive Reviews:{positiveReviews}
                </h5>
              </Col>
              <Col>
                <h5 style={{ margin: "10px" }}>
                  Negative Reviews:{negativeReviews}
                </h5>
              </Col>

              <Col>
                <Button
                  variant="primary"
                  onClick={handleOpenReviewsModal}
                  style={{ margin: "10px" }}
                >
                  More
                </Button>
                <Button
                  variant="success"
                  onClick={handleEvaluateModalShow}
                  style={{ margin: "10px" }}
                >
                  Evaluate
                </Button>
              </Col>
            </Row>
          </Container>
        </Row>
        <hr />
        <Row>
          {/* Display Salary Details*/}
          <Container>
            <h4>Leaves</h4>
            <Row>
              <Col>
                <h5 style={{ margin: "10px" }}>Total Leaves:{totalLeaves}</h5>
              </Col>
              <Col>
                <h5 style={{ margin: "10px" }}>
                  Approved Leaves:{" "}
                  {approvedLeaves !== null ? approvedLeaves : 0}
                </h5>
              </Col>
              <Col>
                <h5 style={{ margin: "10px" }}>
                  Rejected Leaves:{rejectedLeaves !== null ? rejectedLeaves : 0}
                </h5>
              </Col>
              <Col>
                <h5 style={{ margin: "10px" }}>
                  Pending Leaves:
                  {totalLeaves - (rejectedLeaves + approvedLeaves)}
                </h5>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  style={{ margin: "10px" }}
                  onClick={() => setShowLeaveTable(!showLeaveTable)} // Toggle the visibility of the table
                >
                  {showLeaveTable ? "Hide" : "Show"} Leaves
                </Button>
              </Col>
            </Row>
            {showLeaveTable && ( // Render the table only if showTable is true
              <Row>
                {/* Table to display all rejected records */}
                <LeaveRecordsTable
                  leaveRecords={leaves}
                  statusFilter="all"
                  dateFilter={() => true}
                  tableName={`All Leave Records`}
                />
              </Row>
            )}
          </Container>
        </Row>
      </Card.Body>

      {/* Render the EmployeeUpdateModal when showUpdateModal is true */}
      {showUpdateModal && (
        <EmployeeUpdateModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          employee={employee}
          onUpdate={handleUpdateEmployee}
        />
      )}

      {/* Confirmation dialog box */}
      <Modal
        show={showConfirmDelete}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Evaluation modal */}
      <EmpEvaluateModal
        show={showEvaluateModal}
        handleClose={handleEvaluateModalClose}
        handleSubmit={handleCreateReview}
        empId={empId} // Example empId passed as prop
        empDBId={_id} // Example empDBId passed as prop
        name={{ firstName, lastName }} // Example name passed as prop
      />

      {/* Render the SalaryDetailsModal with appropriate props */}
      <SalaryDetailsModal
        show={showSalaryModal}
        handleClose={handleCloseModal}
        id={selectedRecordId}
      />

      {/* Render the MoreReviewsModal with appropriate props */}
      <MoreReviewsModal
        show={showReviewsModal}
        handleClose={handleCloseReviewModal}
        reviews={reviews}
        employeeId={employeeId}
      />

      {/* Render the SystemCredentialsUpdateModal */}
      <SystemCredentialsUpdateModal
        show={showCredentialsModal}
        onHide={hideCredentialsModalHandler}
        employee={employee}
        submitHandler={handleCredUpdate}
      />
    </Card>
  );
}

export default EmployeeDetails;
