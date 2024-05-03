import React from "react";
import "./Lubricants.css";
import ImPageTitle from "../ImPageTitle";
import IMLubricantCard from "./IMLubricantCard";
import {Link} from 'react-router-dom'


function Lubricants({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Lubricants Stock" url="/staff/im/lubricants" />
      
      <Link to="addproduct/">
      <button type="button" className="btn-add">
         Add Product
      <span class="bi bi-plus-circle"></span>
      </button>
      </Link>
      <IMLubricantCard toggleLoading={toggleLoading}/>
    </main>
  );
}

export default Lubricants;
