import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImPageTitle from "../ImPageTitle";

function Lubricantform() {
  const [validated, setValidated] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [Product_name, setName] = useState("");
  const [Product_code, setCode] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Unit_price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("Product_name", Product_name);
    formData.set("Product_code", Product_code);
    formData.set("Quantity", Quantity);
    formData.set("Unit_price", Unit_price);
    formData.set("image", image);
    console.log(formData)
    axios
      .post("http://localhost:5000/Product/addlubricant", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("staff/im/lubricants");
        console.log(res); // FormData object contains all the form data including the image
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    if (image instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error("Error reading the file");
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <main id="main" className="main">
      <ImPageTitle
        title="Add Lubricants"
        url="/staff/im/lubricants/addproduct/"
      />
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          handleSubmit(event);
          sendData(event);
        }}
        encType="multipart/form-data"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              id="Product_name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom02">
            <Form.Label>Product Code</Form.Label>
            <Form.Control
            id="Product_code"
              required
              type="text"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom03">
            <Form.Label>Quanity</Form.Label>
            <Form.Control
              id="Quantity"
              type="number"
              required
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom04">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              id="Unit_price"
              type="text"
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group
          as={Col}
          md="6"
          controlId="validationCustom05"
          className="position-relative mb-3"
        >
          <Form.Label>Product Image</Form.Label>
          <Form.Control
          id="image"
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <img
            src={previewUrl}
            alt="product image"
            style={{ marginTop: "3%", width: "40%", height: "40%" }}
          />
        </Form.Group>

        <Button type="submit">Submit form</Button>
      </Form>
    </main>
  );
}

export default Lubricantform;
