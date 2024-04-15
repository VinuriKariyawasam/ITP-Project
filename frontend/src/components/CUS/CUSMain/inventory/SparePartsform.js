import React, { useState, useEffect,useContext } from "react";
import { useForm } from "../../../../data/IM/form-hook";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext"

function SparePartsform() {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const cusauth = useContext(CusAuthContext);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: true,
      },
      vehicleNumber: {
        value: "",
        isValid: false,
      },
      brand: {
        value: "",
        isValid: false,
      },
      model: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      contactNumber: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      status:{
        value:"",
        isValid:true
      },
      email:{
        value:"",
        isValid:true
      }
    },
    false
  );

  const spSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", cusauth.name);
      formData.append("vehicleNumber", formState.inputs.vehicleNumber.value);
      formData.append("brand", formState.inputs.brand.value);
      formData.append("model", formState.inputs.model.value);
      formData.append("year", formState.inputs.year.value);
      formData.append("color", formState.inputs.color.value);
      formData.append("contactNumber", formState.inputs.contactNumber.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("status", "pending");
      formData.append("email", cusauth.email);

    const currentDateUTC = new Date();
    currentDateUTC.setHours(currentDateUTC.getHours() + 5); 
    currentDateUTC.setMinutes(currentDateUTC.getMinutes() + 30); 
    const formattedDate = currentDateUTC.toISOString(); 

    formData.append("orderdate", formattedDate);
      console.log(formState.inputs)

      const response = await axios.post("http://localhost:5000/Product//addsp", formData);

      navigate("/customer/products");
      console.log(response);
      console.log(formState.inputs);
    } catch (err) {
      console.log(err);
    }
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
    <div style={{ marginTop: "2%", marginLeft: "3%",marginBottom:"3%"}}>
      <div style={{ flex: "1", marginRight: "6%" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Your Ultimate Destination for Quality Spare Parts</h1>
          <span>
            Neo Tech ensures safety and performance with our genuine parts
            selection. We focus on trusted brands, rigorously tested for
            durability and reliability. Choosing genuine parts protects your
            safety and your vehicle's longevity. Trust Neo Tech for quality and
            peace of mind on the road.
          </span>
        </div>
        <br />
        <br />
        <h2>Place your order</h2>
        <Row>
          <Col md={7}>
            <Form onSubmit={spSubmitHandler}>
              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    id="name"
                    isValid="true"
                    type="text"
                    placeholder="Kamal"
                    value={cusauth.name} 
                   disabled
                    
                  />
                </Form.Group>

                <Form.Group as={Col} md="5">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    id="vehicleNumber"
                    type="text"
                    maxLength={9}
                    placeholder="XX-XXXX"
                    onInput={(event) =>
                      inputHandler("vehicleNumber", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>Vehicle Brand</Form.Label>
                  <Form.Control
                    id="brand"
                    type="text"
                    placeholder="Toyota"
                    onInput={(event) =>
                      inputHandler("brand", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="5">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    id="model"
                    type="text"
                    placeholder="Aqua"
                    onInput={(event) =>
                      inputHandler("model", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    className="remove-spinner"
                    id="year"
                    type="Number"
                    maxLength={4}
                    placeholder="Enter Year"
                    onInput={(event) =>
                      inputHandler("year", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    id="color"
                    type="text"
                    maxLength={20}
                    placeholder="Enter color"
                    onInput={(event) =>
                      inputHandler("color", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    id="contactNumber"
                    type="phone"
                    maxLength={10}
                    placeholder=" 07X XXX XXXX"
                    onInput={(event) =>
                      inputHandler("contactNumber", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    id="description"
                    type="textarea"
                    maxLength={150}
                    placeholder="Additional information"
                    onInput={(event) =>
                      inputHandler("description", event.target.value, true)
                    }
                    required
                  />
                </Form.Group>
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
              </Row>
              <Button variant="primary" type="submit" disabled={!formState.isValid}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={4}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Spare part image"
                style={{ marginTop: "3%", width: "80%", height: "80%" }}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SparePartsform;
