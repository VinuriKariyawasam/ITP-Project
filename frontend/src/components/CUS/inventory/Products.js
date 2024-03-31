import React from "react";
import "./Product.css";
import Slideshow from "../../../data/CUS/inventory/Slideshow";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img1 from "../../../images/im/lubricants.jpg";
import img2 from "../../../images/im/tires.jpg";
import img3 from "../../../images/im/spareparts.jpg";

function Products() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <main id="cusmain" className="cusmain">
      <h1 className="h1">Explore Our Premium Automotive Essentials</h1>
      <div className="containerProduct">
        <Slideshow />
        <div className="para1">
          <p>
            <a className="welcome" diabled>
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
            onClick={scrollToBottom}
          >
            Discover<span class="bi bi-arrow-right"></span>
          </button>
        </div>
      </div>
      <h3 className="h3"> Our offerings at Neo Tech...</h3>
      <div className="card-container">
        <Card style={{ width: "30%" }}>
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title>Lubricants</Card.Title>
            <Card.Text>
            "Keep your vehicle running smoothly with our top-quality lubricants for lasting performance."
            </Card.Text>
            <Button variant="primary" className="exbtn">Explore</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%" }}>
          <Card.Img variant="top" src={img2} />
          <Card.Body>
            <Card.Title>Tires</Card.Title>
            <Card.Text>
              Explore our wide selection of quality tire stocks, ensuring smooth
              rides for every vehicle.
            </Card.Text>
            <Button variant="primary" className="exbtn">Explore</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%" }}>
          <Card.Img variant="top" src={img3} />
          <Card.Body>
            <Card.Title>Spare Parts</Card.Title>
            <Card.Text>
              Acquire your vehicle spare parts swiftly and seamlessly with our
              top-notch procurement assistance.
            </Card.Text>
            <Button variant="primary" className="exbtn"> Explore</Button>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
}

export default Products;
