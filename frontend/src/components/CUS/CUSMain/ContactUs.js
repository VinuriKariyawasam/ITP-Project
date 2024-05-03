import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import img2 from "../../../images/Cushome/Contactus.jpg";

const ContactForm = ({ toggleLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toggleLoading(true); // Set loading to true before API call

      const { name, email, message } = formData;

      await axios.post(
        `${process.env.React_App_Backend_URL}/api/mobile/contact`,
        {
          cusName: name,
          cusEmail: email,
          message: message,
        }
      );

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${img2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2
          style={{
            color: "#333333",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Contact Us
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label style={{ color: "#333333" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label style={{ color: "#333333" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label style={{ color: "#333333" }}>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </div>

      {/* Map Section */}
      <div style={{ flex: 1, width: "100%", maxWidth: "calc(100% - 20px)" }}>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            title="Neo Tech Motors and Services"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.898848511275!2d79.9122486!3d6.9026988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259e0f3690af7%3A0x60b5f70768342686!2sNeo%20tech%20Motors%20%26%20Services!5e0!3m2!1sen!2slk!4v1713201216681!5m2!1sen!2slk"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
