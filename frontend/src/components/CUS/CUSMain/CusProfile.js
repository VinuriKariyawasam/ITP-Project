import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CusAuthContext } from "../../../context/cus-authcontext";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import customerlogo from "../../../images/customerlogo.png";

const CusProfile = ({ toggleLoading }) => {
  const cusauth = useContext(CusAuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: "",
    contact: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (cusauth.userId) {
      fetchCustomerData();
    }
  }, [cusauth.userId]);

  const fetchCustomerData = () => {
    try{
      toggleLoading(true);
    fetch(
      `${process.env.React_App_Backend_URL}/api/customer/signup/get-customer/${cusauth.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
    .catch(error =>  {
        console.error("Error fetching customer:", error);
      })
    .finally (() => {
      toggleLoading(false); // Set loading to false after API call completes
    });
  }catch (error) {
      console.error("Error fetching customer:", error);
      toggleLoading(false); // Set loading to false in case of an error
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cusauth.userId) {
      updateCustomerData();
    }
  };

  const updateCustomerData = () => {
    try{
      toggleLoading(true);
    fetch(
      `${process.env.React_App_Backend_URL}/api/customer/signup/update-customer/${cusauth.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Details updated successfully");
        alert("Details updated successfully");
        cusauth.logout();
        navigate("/customer/cuslogin");
      })
    }catch(error)  {
        console.error("Error updating details:", error);
        alert("Error updating details. Please try again later.");
      }finally {
        toggleLoading(false); // Set loading to false after API call
      };
  };
  

  const handleDeleteCustomer = () => {
    if (cusauth.userId) {
      const shouldDelete = window.confirm("Confirm Delete");
      if (shouldDelete) {
        deleteCustomerData();
        cusauth.logout();
        navigate("/customer/cuslogin")
      }
    }
  };

  const deleteCustomerData = () => {
    try{
      toggleLoading(true);
    fetch(
      `${process.env.React_App_Backend_URL}/api/customer/signup/delete-customer/${cusauth.userId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Account deleted successfully");
        console.log("Account deleted successfully");
      })
    }catch(error) {
       console.error("Error deleting Account:", error)
      }finally {
        toggleLoading(false); // Set loading to false after API call
      };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-3);
  };

  return (
    <div>
      <main id="main" style={{ marginLeft: "20px", marginTop: "1px" }}>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleFormSubmit}>
                <Card>
                  <Card.Body>
                    <h1>PROFILE</h1>
                    <img
                      src={customerlogo}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        marginLeft: "0px",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                    <h4 style={{ marginRight: "100px",fontWeight:"bold" }}>
                      Welcome {cusauth.name}
                    </h4>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridExtra1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          rows={1}
                          name="Name"
                          value={formData.Name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridExtra2">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          rows={1}
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          placeholder="1234 Main St"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      </Col>
                    </Row>
                    <br></br>
                    <Button
                      variant="warning"
                      style={{ marginLeft: "400px" }}
                      type="submit"
                      disabled={!cusauth.userId}>
                      Update Profile
                    </Button>{" "}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "50px" }}
                      onClick={handleDeleteCustomer}
                      disabled={!cusauth.userId}
                    >
                      Delete Profile
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};
export default CusProfile;
