import React, { useState, useEffect, useContext } from "react";
import { useForm } from "../../../../data/IM/form-hook";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";

function SparePartsform({ toggleLoading }) {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [vNo, setvNo] = useState("");
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
        isValid: true,
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
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const spSubmitHandler = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    const imgData = new FormData();
    imgData.append("image", formState.inputs.image.value);
    axios
      .post(`${process.env.React_App_Backend_URL}/Product/imgupload`, imgData)
      .then((res) => {
        const Url = res.data.downloadURL;
        console.log(Url);
        try {
          const currentDateUTC = new Date();
          currentDateUTC.setHours(currentDateUTC.getHours() + 5);
          currentDateUTC.setMinutes(currentDateUTC.getMinutes() + 30);
          const formattedDate = currentDateUTC.toISOString();

          const formData = {
            name: cusauth.name,
            vehicleNumber: vNo,
            brand: formState.inputs.brand.value,
            model: formState.inputs.model.value,
            year: formState.inputs.year.value,
            color: formState.inputs.color.value,
            contactNumber: formState.inputs.contactNumber.value,
            description: formState.inputs.description.value,
            status: "pending",
            email: cusauth.email,
            image: Url,
            orderdate: formattedDate,
          };

          const response = axios.post(
            `${process.env.React_App_Backend_URL}/Product//addsp`,
            formData
          );

          navigate("/customer/products/myorders");
          console.log(response);
          console.log(formData);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        alert("error");
      })
      .finally(() => {
        toggleLoading(false);
      });
  };
  const handleAddSri = () => {
    if (/^\d+/.test(vNo)) {
      setvNo((prevVNo) => {
        return prevVNo + "ශ්‍රී";
      });
    } else {
      alert("Please enter a valid format of vehicle number.");
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
    <div style={{ marginTop: "2%", marginLeft: "3%", marginBottom: "3%" }}>
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
                    type="text"
                    placeholder="Enter Vehicle Number"
                    value={vNo}
                    onChange={(event) => setvNo(event.target.value)}
                    maxLength={10}
                    required
                  />
                  <Button variant="secondary" onClick={handleAddSri}>
                    Add ශ්‍රී
                  </Button>
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
                      {
                        let input = event.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove numbers
                      event.target.value = input; // Update the input value
                      inputHandler("brand", input, true); // Call inputHandler with the cleaned input
                    }}
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
                    type="number"
                    min="1960"
                    max="2099"
                    placeholder="Enter Year"
                    onChange={(event) => {
                      const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                      if (input.length > 4) {
                        event.target.value = input.slice(0, 4); // Limit to four digits
                      } else {
                        inputHandler("year", input, true); // Update the input value
                      }
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    id="color"
                    type="text"
                    maxLength={15}
                    placeholder="Enter color"
                    onInput={(event) =>{
                      const input = event.target.value.replace(/[^A-Za-z\s]/g, ''); // Remove numbers and special characters
                      event.target.value = input;
                      inputHandler("color", input, true);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    className="remove-spinner"
                    id="contactNumber"
                    type="Number"
                    pattern="[0-9]{10}"
                    placeholder=" 07X XXX XXXX"
                    onInput={(event) => {
                      let input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (input.startsWith("0")) {
                        input = input.slice(0, 10); // Limit to first 10 digits
                        if (input.length > 10) {
                          input = input.slice(0, 10); // Truncate to 10 digits
                        }
                      } else {
                        input = ""; // Reset input if it doesn't start with '0'
                      }
                      event.target.value = input;
                      inputHandler("contactNumber", input, true);
                    }}
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
              <Button
                variant="primary"
                type="submit"
                disabled={!formState.isValid}
              >
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
