import React ,{ useState,useEffect } from 'react';
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";
import "./Products/Lubricants";
import ImPageTitle from "./ImPageTitle";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function IMMain({ toggleLoading }) {

  const [Quantity, setQuantity] = useState([]);
  const [selectedproduct, setproduct] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState(0);

  useEffect(() => {
    function getQuantity() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getquantity`)
        .then((res) => {
          setQuantity(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getQuantity();
  }, []);

  useEffect(() => {
    if (selectedproduct) {
      console.log("Selected Product:", selectedproduct);
    }
  }, [selectedproduct]);

  const handleButtonClick = (item) => {
    setShowModal(true);
    setproduct(item)
        axios.delete(`${process.env.React_App_Backend_URL}/Product/deletequantity/${item._id}`)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              })
  };

  const handleAddQuantity = (up) => {
   
    if (up > 0) {
      console.log("Adding quantity:", up);
    } else {
      console.error("Quantity must be greater than 0.");
    }
    toggleLoading(true);
    if (selectedproduct) {
      const type = selectedproduct.Product_type
      const name = selectedproduct.Product_name
    if(type == "lubricant"){

      axios.get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
        .then((res) => {
          const lubricant = (res.data)
          const lubricanttoupdate = lubricant.find((product) => product.Product_name === name);
        const pastItemId = lubricanttoupdate ? lubricanttoupdate._id : null;
          console.log("lubricants ",pastItemId)
          const quantityAsNumber = Number(lubricanttoupdate.Quantity);
          const upAsNumber = Number(up);
          const q = quantityAsNumber+upAsNumber;
          const upproduct ={
            Product_name: lubricanttoupdate.Product_name,
            Product_brand: lubricanttoupdate.Product_brand,
            Quantity: q,
            Unit_price: lubricanttoupdate.UnitPrice,
            image: lubricanttoupdate.image, 
          }
          axios
      .put(`${process.env.React_App_Backend_URL}/Product/updatelubricant/${pastItemId}`, upproduct)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });

    })}else if(type == "tire"){
      axios
      .get(`${process.env.React_App_Backend_URL}/Product/Tirestock`)
      .then((res) => {
        const tire = (res.data)
        const tiretoupdate = tire.find((product) => product.Product_name === name);
        const pastItemId = tiretoupdate ? tiretoupdate._id : null;
        console.log("tires", pastItemId)
        const quantityAsNumber = Number(tiretoupdate.Quantity);
        const upAsNumber = Number(up);
        const q = quantityAsNumber+upAsNumber;
        console.log(q)
        const upproduct ={
          Product_name: tiretoupdate.Product_name,
          Product_brand: tiretoupdate.Product_brand,
          vehicle_Type: tiretoupdate.vehicle_Type,
          Quantity: q,
          Unit_price: tiretoupdate.UnitPrice,
          image: tiretoupdate.image, 
        }
          console.log("complete",upproduct)
        axios
      .put(`${process.env.React_App_Backend_URL}/Product/updateTire/${pastItemId}`, upproduct)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        toggleLoading(false);
      });
      })
    }
    setShowModal(false);

  }}

  const handleCloseModal = () => {
    setShowModal(false);
    setQuantityToAdd(0);
  };

  return (
    <main id="main" className="main">
      <ImPageTitle title="Inventory Manager Dashboard" url="/staff/im" />
      <IMDashboard toggleLoading={toggleLoading}/>
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
                  <td><Button variant="success" onClick={() =>handleButtonClick(item)}>Done</Button></td>
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

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="quantityInput">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
             className="remove-spinner"
              type="number"
              min= "1"  
              pattern="[0-9]*"
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleAddQuantity(quantityToAdd)}>Add Quantity</Button>
        </Modal.Footer>
      </Modal>
  
    </main>
  );
}

export default IMMain;
