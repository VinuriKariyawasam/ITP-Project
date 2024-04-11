import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Lubricants() {
    const [Products, setProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        function getProducts() {
          axios
            .get("http://localhost:5000/Product/lubricantstock")
            .then((res) => {
              const initialQuantities = {};
              res.data.forEach((product) => {
                initialQuantities[product._id] = 0;
              });
              setProducts(res.data);
              setQuantities(initialQuantities);
            })
            .catch((err) => {
              alert("error");
            });
        }
        getProducts();
      }, []);

      
    const handleBrandChange = (event) => {
      setSelectedBrand(event.target.value);
  }

  const increment = (productId, initialQuantity) => {
    if (quantities[productId] <= initialQuantity  || initialQuantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      }));
      setProducts((prevProducts) => (
        prevProducts.map(product => 
          product._id === productId 
            ? {...product, Quantity: product.Quantity - 1} 
            : product
        )
      ));
    }
  };
  
  const decrement = (productId, initialQuantity) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
      setProducts((prevProducts) => (
        prevProducts.map(product => 
          product._id === productId 
            ? {...product, Quantity: product.Quantity + 1} 
            : product
        )
      ));
    }
  };
  

  const filteredProducts = selectedBrand === "" ? Products : Products.filter(product => product.Product_brand === selectedBrand);

  return (
    <div style={{ marginTop: "2%", marginLeft: "3%" }}>
        <h1 style={{textAlign:"center"}}>GET FIRST CLASS LUBRICANTS </h1>
    <Form.Label style={{marginLeft:"45%",fontWeight:"bold"}}>Brand</Form.Label>

    <Form.Select aria-label="Default select example" style={{ marginLeft: "37%", width: "20%" }} onChange={handleBrandChange} value={selectedBrand}>
                <option value="">All</option>
                <option value="val">val</option>
                <option value="maxxies">maxxies</option>
                <option value="Servo">Servo</option>
            </Form.Select>
        <div style={{display:'flex',marginTop:"4%",flexWrap: "wrap",
  justifyContent: "space-between",marginRight:"3%"}}>
        {filteredProducts.map((product) => (
        <Card style={{ width: '27%' }}>
      <Card.Img variant="top" src={`http://localhost:5000/${product.image}`} />
      <Card.Body>
        <Card.Title style={{ textAlign:"center" }}>{product.Product_name}</Card.Title>
        <Card.Text style={{textAlign:"center"}}>
        {product.Product_brand}
        </Card.Text>
        <hr/>
        <Card.Text style={{textAlign:"center"}}>
        Unit price : Rs.{product.Unit_price}
        </Card.Text>
        <hr/>
        <Row>
        <Col  md={7}>
        <Card.Text>Available Quantity : {product.Quantity}</Card.Text>
        <div style={{display:'flex'}}>
        <Button variant='light' onClick={() => decrement(product._id,product.Quantity)}><i class="bi bi-dash-circle-fill"/></Button>
        <Form.Control className="remove-spinner" type="number"style={{ width:"30%"}} value={quantities[product._id]}/>
        <Button variant='light' onClick={() => increment(product._id,product.Quantity)}><i class="bi bi-plus-circle-fill"/></Button>
        </div>
        </Col>
        <Col md={4}>
        <Button variant="secondary" style={{ marginTop:"15%"}}>Add to cart <i class="bi bi-cart-plus-fill"></i></Button>
        </Col>
      </Row>
      </Card.Body>
    </Card>
    ))}
    </div>
   </div>
  )
}

export default Lubricants