import React from 'react'
import './Product.css'
import Slideshow from '../../../data/CUS/inventory/Slideshow'

function Products() {
  return (
    <main id="cusmain" className="cusmain">
    <div className="containerProduct">
    <Slideshow/>
    </div>
    <div className="para1">
        <p>
          Welcome to Neo Tech, your premier destination for top-quality spare
          parts, premium tires, and high-performance lubricants. We're dedicated
          to providing excellence and innovation to keep your vehicle running
          smoothly. Explore our range today for unmatched reliability and
          performance.
        </p>
        </div>
   </main>
  )
}

export default Products