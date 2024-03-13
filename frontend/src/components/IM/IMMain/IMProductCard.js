import React, {useState, useEffect} from 'react'
import './IMProductCard.css'
import IM from '../../../images/im/val1.png'
import axios from 'axios'

function IMProductCard() {

  const [Products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
        axios.get("http://localhost:5000/product/").then((res) => {
            setProducts(res.data);

        }).catch((err) => {
            alert("error")
        })
    }
    getProducts();
}, [])

const Delete = (id) => {
  const shouldDelete = window.confirm("Confirm Delete");
  if (shouldDelete) {
      axios.delete(`http://localhost:5000/product/delete/${id}`)
          .then(response => {
              console.log(response);
              window.location.reload();
          })
          .catch(error => {
              // Handle errors here
              console.error(error);
          });
  }
};

    return (
      <main className="mainproduct">
      <div className='container-Product'>
        {Products.map((product) => (
          <div key={product._id} className="product-card-container">
            <div className="product-card">
              <img src={IM} className="product-image" alt={product.Product_name} />
              <h6 className='product-header'>{product.Product_name}</h6>
              <a className='product-name'>{product.Product_code}</a>
              <div>
                <input type='text' className='price' placeholder={`Price: ${product.Unit_price}`} />
                <button className='updatebtn'>Update</button>
              </div>
              <div className='quantity-details'>
                <a className='price'>Quantity</a>
                <button className='quantity-btn bi bi-dash-circle'></button>
                <a className='quantity'>{product.Quantity}</a>
                <button className='quantity-btn bi bi-plus-circle'></button>
              </div>
              <button className='delete-btn' onClick={() => Delete(product._id)}>Delete Product</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );

}

export default IMProductCard;
