import React from "react";
import "./aboutUs.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import about5 from "../../../../images/AboutUs/about5.jpg";
import about4 from "../../../../images/AboutUs/about4.jpg";
import about7 from "../../../../images/AboutUs/about7.jpg";
import about8 from "../../../../images/AboutUs/about8.jpeg";
import about9 from "../../../../images/AboutUs/about9.jpg";

function AboutUs() {
  // This function is declared but not used, so we can remove it
  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <main id="cusmain" className="cusmain">
      <h1 className="aboutus_h1">About Us</h1>

      <div className="aboutus-intro">
        <div className="aboutus-text">
          <h1 className="aboutus-heading">Welcome to Neo Tech Motors & Services</h1>
          <p className="aboutus-description">
            At Neo Tech Motors & Services, we are passionate about automobiles and committed to excellence. Our platform is built by automotive enthusiasts, with a shared vision of providing a unique and unparalleled experience for all things automotive.
          </p>
        </div>
        <img className="aboutus-image" src={about9} alt="about image" />
      </div>
      <div className="containerProduct">
        {/* Add the image */}
        <img className="aboutusimg-left" src={about5} alt="about image" />
        <div className="aboutus_para1">
          <p>
            <a className="welcome" style={{ fontSize: "30px" }} disabled>
              Welcome to Neo Tech,
            </a>
            <br />
            <br /> Where a passion for automobiles meets a commitment to excellence.
            As automotive enthusiasts ourselves, we founded this platform with a shared vision of providing a unique and unparalleled experience for all things automotive.
          </p>
        </div>
      </div>
      <div className="productcard-container">
        <div className="card-wrapper">
          <Card style={{ width: "100%", backgroundColor: "white" }}>
            <Card.Img variant="top" src={about4} />
            <Card.Body>
              <Card.Title>Quality Automotive Services</Card.Title>
              <Card.Text>
                Explore a range of services tailored to meet the diverse needs of vehicle owners, including vehicle registration, maintenance tips, services, breakdowns, etc.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="card-wrapper">
          <Card style={{ width: "100%", backgroundColor: "white" }}>
            <Card.Img variant="top" src={about7} />
            <Card.Body>
              <Card.Title>Experience Reliable and Quality Service at Our Automotive Center</Card.Title>
              <Card.Text>
                Beyond services, we foster a community of like-minded automotive enthusiasts. Join us in celebrating the love for cars, motorcycles, and everything in between. Share your experiences, connect with fellow enthusiasts, and be part of a vibrant automotive community.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default AboutUs;
