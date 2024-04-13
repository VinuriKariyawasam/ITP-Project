import React, { useState, useEffect } from "react";
import "./IMProductCard.css";

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

  const handlePriceChange = (id, value) => {
    if (value > 0 && Number.isInteger(Number(value))) {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === id ? { ...product, Unit_price: value } : product
      )
    );
  }
  };

  const handleQuantityChange = (id, value) => {
    if (value > 0 && Number.isInteger(Number(value))) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? { ...product, Quantity: value } : product
        )
      );
    }
  };

  const update = (id) => {
    const productToUpdate = Products.find(product => product._id === id);
    axios
      .put(`http://localhost:5000/Product/updateTire/${id}`, productToUpdate)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <main className="mainproduct">
      <div className="container-Product">
        {Products.map((product) => (
          <div key={product._id} className="product-card-container">
            <div className="product-card">
              <img
              style={{marginLeft:"10%",width:"80%",height:"60%"}}
                src={`http://localhost:5000/${product.image}`}
                className="product-image"
                alt={product.Product_name}
              />
              <h4 className="product-header">{product.Product_name}</h4>
              <span className="product-name">
                Product Brand:{product.Product_Brand}
              </span>
              <br/>
              <span style={{marginTop:"0%",marginLeft:"20%"}}>
                vehicle type:{product.vehicle_Type}
              </span>
              <div className="product-name">
                <label htmlFor={`price-${product._id}`}>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs.</label>
                <input className="product-price"

                  id={`price-${product._id}`}
                  type="number"
                  value={product.Unit_price}
                   onChange={(e) =>
                  handlePriceChange(product._id, e.target.value)
                }
                  style={{
                    border: "none", 
                    outline: "none",
                    width:"50%",
                  }}
                />
              </div>
              <div className="product-name">
              <label htmlFor={`quantity-${product._id}`}>Quantity:&nbsp;&nbsp;&nbsp;</label>
              <input
                id={`quantity-${product._id}`}
                type="number"
                value={product.Quantity}
                 onChange={(e) =>
                handleQuantityChange(product._id, e.target.value)
                 }
                style={{
                  border: "none", 
                  outline: "none",
                  width:"50%", 
                }}
              />
            </div>
              <Button
                variant="danger"
                onClick={() => Delete(product._id)}
                className="btnproductdel"
              >
                Delete Product
              </Button>
              <Button variant="warning" className="btnproductup" onClick={() => update(product._id)}>
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
