import React ,{ useState,useEffect } from 'react';
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";
import "./Products/Lubricants";
import ImPageTitle from "./ImPageTitle";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from "axios";

function IMMain() {

  const [Quantity, setQuantity] = useState([]); 
  useEffect(() => {
    function getQuantity() {
      axios
        .get("http://localhost:5000/Product/getquantity")
        .then((res) => {
          setQuantity(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          alert("error");
        });
    }
    getQuantity();
  }, []);

  const handleButtonClick = (id) => {
    axios
              .delete(`http://localhost:5000/Product/deletequantity/${id}`)
              .then((response) => {
                console.log(response);
                window.location.reload();
              })
              .catch((error) => {
                console.error(error);
              });
  };

  return (
    <main id="main" className="main">
      <ImPageTitle title="Inventory Manager Dashboard" url="/staff/im" />
      <IMDashboard />
      <br />
      <h2>Stocks running low</h2>
        <Card >
        <Table >
      <thead>
        <tr>
          <th>Product name</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
            { Quantity.length > 0 ? (
              Quantity.map((item) => (
                <tr key={item._id}>
                  <td>{item.Product_name}</td>
                  <td>{item.Product_type}</td>
                  <td><Button variant="success" onClick={() => handleButtonClick(item._id)}>Done</Button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{textAlign:"center"}} ><h2>Stocks are not running low</h2></td>
              </tr>
            )}
          </tbody>
    </Table>
        </Card>
  
    </main>
  );
}

export default IMMain;
