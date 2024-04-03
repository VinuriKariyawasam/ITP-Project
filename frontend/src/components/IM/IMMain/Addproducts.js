import React from 'react'
import Productform from './Productform'
import ImPageTitle from './ImPageTitle'
function Addproducts() {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Add Products" url="/im/addproduct" />
        <Productform/>
   </main>
  )
}

export default Addproducts