import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImPageTitle from '../ImPageTitle';

function Lubricantform() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  const[ Product_name, setName] = useState("");
  const[Product_code, setCode] = useState("");
  const[Quantity,setQuantity] = useState("");
  const[Unit_price, setPrice] = useState("");
  const navigate = useNavigate();

  function sendData(e){
      e.preventDefault();

      const newProduct={
        Product_name,
        Product_code,
        Quantity,
        Unit_price
      }

      axios.post("http://localhost:5000/Product/addlubricant",newProduct).then(()=>{
          navigate('staff/im/lubricants/');
      }).catch((err)=>{
          alert(err)
      })  
      }


  return (
    <main id="main" className="main">
      <ImPageTitle title="Add Lubricants" url="/staff/im/lubricants/addproduct/" />
    <Form noValidate validated={validated} onSubmit={(event) => {handleSubmit(event); sendData(event);}}>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom01">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e)=>{
              setName(e.target.value);}}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom02">
          <Form.Label>Product Code</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e)=>{
              setCode(e.target.value);}}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Quanity</Form.Label>
          <Form.Control type="number" 
           required  
           onChange={(e)=>{
            setQuantity(e.target.value);}}
           />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom04">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control type="text"
            required
            onChange={(e)=>{
              setPrice(e.target.value);}}
            />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
         <Form.Group as={Col} md="6" controlId="validationCustom05" className="position-relative mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
               />
            <Form.Control.Feedback type="invalid" tooltip>
              
            </Form.Control.Feedback>
          </Form.Group>
      
      <Button type="submit">Submit form</Button>
    </Form>
    </main>
  );
}

export default Lubricantform;