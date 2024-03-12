import React from 'react'
import './IMProductCard.css'
import IM from '../../../images/im/val1.png'

function IMProductCard() {
  return(
    
    <main className="mainproduct">
      <div className='container-Product'>
    <img src={IM} className="product-image" />
    <h6 className='product-header'>VALVOLINE 4 TECH<br/>ULTIMATE 10W40</h6>
    <a className='product-name'>883081-sn-1 ltr</a>
    <div>
      <input type='text' className='price' placeholder='LKR 2,055'></input>
      <button className='updatebtn'>Update</button>
    </div>
    <div className='quantity-details'>
      <a className='price'>Quantity</a>
      <button className='quantity-btn' class="bi bi-dash-circle"></button>
      <a className='quantity'>12</a>
      <button className='quantity-btn' class="bi bi-plus-circle"></button>
    </div>
    <button className='delete-btn'> Delete Product</button>
    </div>
    </main>
  );
}

export default IMProductCard;