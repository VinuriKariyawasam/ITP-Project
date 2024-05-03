import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImPageTitle from "../ImPageTitle";
import { useForm } from "../../../../data/IM/form-hook";
import InputGroup from "react-bootstrap/InputGroup";

const Tireform = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const [formState, inputHandler] = useForm(
    {
      product_name: {
        value: "",
        isValid: false,
      },
      product_brand: {
        value: "",
        isValid: false,
      },
      vehicle_Type: {
        value: "",
        isValid: false,
      },
      quantity: {
        value: "",
        isValid: false,
      },
      unit_price: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const tireSubmitHandler = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    const imgData = new FormData();
    imgData.append("image", formState.inputs.image.value);
    axios.post(`${process.env.React_App_Backend_URL}/Product/imgupload`, imgData)
    .then((res) => {
      const Url = res.data.downloadURL
      console.log(Url)
    try {
      const formData = {
     product_name: formState.inputs.product_name.value,
     product_brand: formState.inputs.product_brand.value,
     vehicle_Type :formState.inputs.vehicle_Type.value,
     quantity :formState.inputs.quantity.value,
     unit_price: formState.inputs.unit_price.value,
     image: Url
      }
      const response = axios.post(
        `${process.env.React_App_Backend_URL}/Product/addTires`,
        formData
      );

      navigate("staff/im/Tires/");
      console.log(response);
      console.log(formState.inputs);
    } catch (err) {
      console.log(err);
    }})
    .catch((err) => {
      alert("error");
    }).finally(() => {
      toggleLoading(false);
    });
  };

  useEffect(() => {
    if (formState.inputs.image.value instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error("Error reading the file");
      };
      fileReader.readAsDataURL(formState.inputs.image.value);

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formState.inputs.image.value.type)) {
        setFileError("Please select a valid image file (JPEG, JPG, or PNG).");
      } else {
        setFileError("");
      }
    }
  }, [formState.inputs.image.value]);

  return (
    <main id="main" className="main">
      <ImPageTitle title="Add Tires" url="/staff/im/tires/addproduct/" />

      <Form onSubmit={tireSubmitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              id="product_name"
              maxLength={100}
              type="text"
              placeholder="Enter product name"
              onInput={(event) =>
                inputHandler("product_name", event.target.value, true)
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Product Brand</Form.Label>
            <Form.Control
              id="product_brand"
              type="text"
              maxLength={40}
              placeholder="Enter product brand"
              onInput={(event) =>
                inputHandler("product_brand", event.target.value, true)
              }
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Vehicle type</Form.Label>
            <Form.Control
              id="vehicle_Type"
              type="text"
              maxLength={20}
              placeholder="Enter vehicle type"
              onInput={(event) =>
                {
                  const input = event.target.value.replace(/[^A-Za-z\s]/g, ''); // Remove numbers and special characters
                  event.target.value = input;
                inputHandler("vehicle_Type", input, true)
              }}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              min="1"
              onInput={(event) =>{
                let input = event.target.value.replace(/[^\d]/g, ''); // Remove non-digit characters
               event.target.value = input;
                inputHandler("quantity", input, true);
              }}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Unit Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>Rs.</InputGroup.Text>
              <Form.Control
                className="remove-spinner"
                id="unit_price"
                type="number"
                placeholder="Enter unit price"
                min="1"
                onInput={(event) =>{
                  let input = event.target.value.replace(/[^\d]/g, ''); // Remove non-digit characters
                event.target.value = input;
                  inputHandler("unit_price", input, true)
                }}
                required
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Image</Form.Label>
            <Form.Control
              id="image"
              type="file"
              accept=".jpg,.png,.jpeg"
              placeholder="add image"
              onInput={(event) =>
                inputHandler("image", event.target.files[0], true)
              }
              required
            />
            {fileError && (
              <Form.Text className="text-danger">{fileError}</Form.Text>
            )}
          </Form.Group>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="product image"
              style={{ marginTop: "3%", width: "20%", height: "20%" }}
            />
          )}
        </Row>
        <Button variant="primary" type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default Tireform;
