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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import EmployeeUpdateModal from "../HR/hrMain/EmployeeUpdateModal";
import SystemCredentialsUpdateModal from "../HR/hrMain/SystemCredentialsUpdateModal";
//import { StaffAuthContext } from "../../../Context/Staff/StaffAuthContext";
import ProfileImageUpdateForm from "../HR/hrMain/ProfileImageUpdateForm";

function StaffMyProfile(props) {
  const employeeId = props.userId;
  //const { employeeId } = useParams();
  //to redirect after success
  const navigate = useNavigate();
  //get token from context
  //const { token } = useContext(StaffAuthContext);
  //states
  const [employee, setEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);

  //Function to fetch employee personal data by database
  const fetchEmployeeById = async (employeeId) => {
    try {
      props.toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/employee/${employeeId}`
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
    } finally {
      props.toggleLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    fetchEmployeeById(employeeId);
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
  };

  /*----Parts regarding update credentials modal-------*/
  // Function to show the modal
  const showCredentialsModalHandler = () => {
    setShowCredentialsModal(true);
  };

  // Function to hide the modal
  const hideCredentialsModalHandler = () => {
    setShowCredentialsModal(false);
    fetchEmployeeById(employeeId);
  };

  // Function to handle opening and closing of the profile pic update modal
  const handlePPUModal = () => {
    setShowProfilePicModal(!showProfilePicModal);
  };

  const handleImageUpdate = async () => {
    setShowProfilePicModal(false);
    fetchEmployeeById(employeeId);
    alert("Profile Picture Updated Successfully");
  };

  return (
    <Card style={{ padding: "20px", marginTop: "60px" }}>
      <h2>
        <Button
          variant="dark"
          onClick={() => navigate(-1)}
          style={{ margin: "10px" }}
        >
          <BsArrowLeft /> Back
        </Button>
      </h2>
      <hr />
      <Card.Body style={{ padding: "10px" }}>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            {/* Display Personal Details*/}
            <Container className="personalDetails">
              <h4>My Profile</h4>
              <Row style={{ marginBottom: "10px" }}>
                <Col xs={12} md={8}>
                  <Image
                    src={photoUrl}
                    rounded
                    style={{ width: "200px", height: "200px" }}
                  />
                  <Button
                    variant="primary"
                    onClick={handlePPUModal}
                    style={{ margin: "3%" }}
                  >
                    Update Profile Picture
                  </Button>
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
          </Col>
          <Col md={3}></Col>
          <hr />
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={3}>
            {/* Personal Details Update Button */}
            <Button
              variant="dark"
              onClick={handleUpdateClick}
              style={{ margin: "10px" }}
            >
              Update Details
            </Button>
          </Col>
          <Col md={3}>
            {employee.position != "Technician" && (
              <Button
                variant="dark"
                onClick={showCredentialsModalHandler}
                style={{ margin: "10px" }}
              >
                Update Credentials
              </Button>
            )}
          </Col>
          <Col md={3}></Col>
        </Row>
      </Card.Body>

      {/* Render the EmployeeUpdateModal when showUpdateModal is true */}
      {showUpdateModal && (
        <EmployeeUpdateModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          employee={employee}
          onUpdate={handleUpdateEmployee}
          toggleLoading={props.toggleLoading}
        />
      )}

      {/* Render the SystemCredentialsUpdateModal */}
      <SystemCredentialsUpdateModal
        show={showCredentialsModal}
        onHide={hideCredentialsModalHandler}
        employee={employee}
        toggleLoading={props.toggleLoading}
      />
      {/* Render the ProfilePicUpdateModal */}
      <ProfileImageUpdateForm
        show={showProfilePicModal}
        handleClose={handlePPUModal}
        empId={_id}
        onUploadPic={handleImageUpdate}
        toggleLoading={props.toggleLoading}
      />
    </Card>
  );
}

export default StaffMyProfile;
