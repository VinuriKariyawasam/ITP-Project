import React, { useState, useEffect } from "react";
import "./IMProductCard.css";
import IM from "../../../../images/im/Maxxis 2.jpg";
import axios from "axios";
import Button from "react-bootstrap/Button";
function IMTireCard() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:5000/Product/Tirestock")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getProducts();
  }, []);

  const Delete = (id) => {
    const shouldDelete = window.confirm("Confirm Delete");
    if (shouldDelete) {
      axios
        .delete(`http://localhost:5000/Product/deleteTires/${id}`)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
  };

  return (
    <main className="mainproduct">
      <div className="container-Product">
        {Products.map((product) => (
          <div key={product._id} className="product-card-container">
            <div className="product-card">
              <img
                src={IM}
                className="product-image"
                alt={product.Product_name}
              />
              <h4 className="product-header">{product.Product_name}</h4>
              <p className="product-name">
                Product code:{product.Product_code}
              </p>
              <div>
                <p className="product-name">Price: Rs.{product.Unit_price} </p>
              </div>
              <p className="quantity">Available Quantity: {product.Quantity}</p>
              <Button
                variant="danger"
                onClick={() => Delete(product._id)}
                className="btnproductdel"
              >
                Delete Product
              </Button>
              <Button variant="warning" className="btnproductup">
                Update Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default IMTireCard;
