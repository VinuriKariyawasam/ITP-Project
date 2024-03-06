import React from "react";
import DbCard from "../IMMain/IMDbCard";

function IMDashboard() {
  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Total Products"
            value1="70 tires"
            value2="59 lubricants"
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
