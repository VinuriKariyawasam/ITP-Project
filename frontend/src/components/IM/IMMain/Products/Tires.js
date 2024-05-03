import React from "react";
import "./Tires.css";
import ImPageTitle from "../ImPageTitle";
import IMTireCard from "./IMTireCard";
import {Link} from 'react-router-dom'


function Tires({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Tires Stock" url="/staff/im/Tires" />
      
      <Link to="addproduct/">
      <button type="button" className="btn-add">
         Add Product
      <span class="bi bi-plus-circle"></span>
      </button>
      </Link>
      <IMTireCard toggleLoading={toggleLoading}/>
    </main>
  );
}

export default Tires;
