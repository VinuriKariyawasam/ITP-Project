import React from "react";
import "./Product.css";
import Slideshow from "../../../data/CUS/inventory/Slideshow";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../../../images/im/lubricants.jpg'

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
            Explore<span class="bi bi-arrow-right"></span>
          </button>
        </div>
      </div>
      <h3 className="h3"> Our offerings at Neo Tech...</h3>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img1} />
      <Card.Body>
        <Card.Title>Lubricants</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Explore</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img1} />
      <Card.Body>
        <Card.Title>Lubricants</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Explore</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img1} />
      <Card.Body>
        <Card.Title>Lubricants</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Explore</Button>
      </Card.Body>
    </Card>
    </main>
  );
}

export default Products;
