
import React, { useState, useEffect } from "react";
import axios from "axios";
import DbCard from "../IMMain/IMDbCard";

function IMDashboard({ toggleLoading }) {

  const [lubricantCount, setLubricantCount] = useState(0);
  const [TireCount, setTireCount] = useState(0);
  const [OrderCount,setOrderCount] = useState(0);
  const [completedOrderTotal, setCompletedOrderTotal] = useState(0);
  const [completedSparePartTotal, setCompletedSparePartTotal] = useState(0);
  useEffect(() => {
    function getLubricants() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
        .then((res) => {
          
          setLubricantCount(res.data.length); 
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getLubricants();
  }, []);

  useEffect(() => {
    function getTires() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/Tirestock`)
        .then((res) => {
          setTireCount(res.data.length); 
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getTires();
  }, []);

  useEffect(() => {
    function getCompletedOrders() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getordercompleted`)
        .then((res) => {
          const total = res.data.reduce((acc, order) => acc + order.total, 0);
          setCompletedOrderTotal(total);
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getCompletedOrders();
  }, []);

  useEffect(() => {
    function getCompletedSpareParts() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/completedsp`)
        .then((res) => {
          const total = res.data.reduce((acc, sparePart) => acc + sparePart.total, 0);
          setCompletedSparePartTotal(total);
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getCompletedSpareParts();
  }, []);

  
  useEffect(() => {
    function getOrderCount() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/pendingsp`)
        .then((res) => {
          setOrderCount(res.data.length); 
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getOrderCount();
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
            value1={`${OrderCount} Orders`} 
            value2=""
            iconClass="bi bi-cart-dash"
            duration="This month"
          />
          <DbCard
            title="Total Income"
            value1={`Products: Rs.${completedOrderTotal}`}
            value2={`Spare parts: Rs.${completedSparePartTotal}`}
            iconClass="bi bi-cash-coin"
            duration="All the time"
          />
        </div>
        
      </div>
    </section>
  );
}

export default IMDashboard;
