import React from "react";
import "./Product.css";
import Slideshow from "../../../../data/CUS/inventory/Slideshow";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img1 from "../../../../images/im/lubricants.jpg";
import img2 from "../../../../images/im/tires.jpg";
import img3 from "../../../../images/im/spareparts.jpg";
import { Link } from "react-router-dom";

function Products() {
  const scrollDown = (amount) => {
    window.scrollBy({
      top: amount,
      behavior: "smooth",
    });
  };

  return (
    <main
      id="cusmain"
      className="cusmain"
      style={{ marginLeft: "9%", marginRight: "9%", marginTop: "2%" }}
    >
      <h1 className="inventory_h1">
        Explore Our Premium Automotive Essentials
      </h1>
      <div className="containerProduct">
        <Slideshow />
        <div className="inventory_para1">
          <p>
            <a className="welcome" style={{ fontSize: "30px" }} diabled>
              Welcome to Neo Tech,
            </a>
            <br />
            <br /> your premier destination for top-quality spare parts, premium
            tires, and high-performance lubricants. We're dedicated to providing
            excellence and innovation to keep your vehicle running smoothly.
            Explore our range today for unmatched reliability and performance.
          </p>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            onClick={() => scrollDown(600)}
          >
            <b>
              Discover<span class="bi bi-arrow-right"></span>
            </b>
          </button>
        </div>
      </div>
      <h3 className="inventory_h3"> Our offerings at Neo Tech...</h3>
      <div className="productcard-container">
        <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title>Lubricants</Card.Title>
            <Card.Text>
              "Keep your vehicle running smoothly with our top-quality
              lubricants for lasting performance."
            </Card.Text>
            <Link to="lubricants">
              <Button variant="primary" className="exbtn">
                Explore
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={img2} />
          <Card.Body>
            <Card.Title>Tires</Card.Title>
            <Card.Text>
              Explore our wide selection of quality tire stocks, ensuring smooth
              rides for every vehicle.
            </Card.Text>
            <Link to="tires">
              <Button variant="primary" className="exbtn">
                Explore
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={img3} />
          <Card.Body>
            <Card.Title>Spare Parts</Card.Title>
            <Card.Text>
              Acquire your vehicle spare parts swiftly and seamlessly with our
              top-notch procurement assistance.
            </Card.Text>
            <Link to="sparepartsform">
              <Button variant="primary" className="exbtn">
                Explore
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
}

export default Products;
