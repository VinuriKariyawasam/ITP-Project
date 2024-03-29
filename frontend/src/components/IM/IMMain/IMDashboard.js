
import React, { useState, useEffect } from "react";
import axios from "axios";
import DbCard from "../IMMain/IMDbCard";

function IMDashboard() {

  const [lubricantCount, setLubricantCount] = useState(0);
  const [TireCount, setTireCount] = useState(0);
  useEffect(() => {
    function getLubricants() {
      axios
        .get("http://localhost:5000/Product/lubricantstock")
        .then((res) => {
          
          setLubricantCount(res.data.length); 
        })
        .catch((err) => {
          alert("error");
        });
    }
    getLubricants();
  }, []);

  useEffect(() => {
    function getTires() {
      axios
        .get("http://localhost:5000/Product/Tirestock")
        .then((res) => {
          setTireCount(res.data.length); 
        })
        .catch((err) => {
          alert("error");
        });
    }
    getTires();
  }, []);




  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Total Products"
            value1={`${TireCount} Tires`}
            value2={`${lubricantCount} lubricants`}
            iconClass="bi bi-bag-check-fill"
            duration="In Stock"
          />
          <DbCard
            title="Pending Orders"
            value1="7 Orders"
            value2=""
            iconClass="bi bi-cart-dash"
            duration="This month"
          />
          <DbCard
            title="Total Income"
            value1="Rs.1,220,460.00"
            value2=""
            iconClass="bi bi-cash-coin"
            duration="This month"
          />
        </div>
        
      </div>
    </section>
  );
}

export default IMDashboard;
