import React, { useState, useEffect } from "react";
import "./IMProductCard.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import './Productformsprice.css'
function IMLubricantCard({ toggleLoading }) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getProducts();
  }, []);

  const Delete = (id,Image) => {
    const shouldDelete = window.confirm("Confirm Delete");
    const image = Image
    if (shouldDelete) {
      toggleLoading(true);
      axios
        .delete(`${process.env.React_App_Backend_URL}/Product/deletelubricant/${id}`, { data: { image } })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          toggleLoading(false);
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
    toggleLoading(true);
    axios
      .put(`${process.env.React_App_Backend_URL}/Product/updatelubricant/${id}`, productToUpdate)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        toggleLoading(false);
      });
  };

  return (
    <main className="mainproduct">
      <div className="container-Product">
        {Products.map((product) => (
          <div key={product._id} className="product-card-container">
            <div className="product-card">
              <center><img
                src={`${product.image}`}
                className="product-image"
                alt={product}
                style={{
                  marginTop:"3%",
                  width: "200px", 
                  height: "200px", 
                }}
              />
              </center>
              <h4 className="product-header">{product.Product_name}</h4>
              <p className="product-name">
                Product brand:{product.Product_brand}
              </p>
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
            <Button variant="danger" className="btnproductdel"  onClick={() => Delete(product._id,product.image)}>
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

export default IMLubricantCard;
