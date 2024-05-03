import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import {
  Button,
  Form,
  Modal,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Card,
  Image,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

function EmployeeUpdateModal({
  show,
  onHide,
  employee,
  onUpdate,
  toggleLoading,
}) {
  //to redirect after success
  const navigate = useNavigate();
  const { userId, userPosition, isLoggedIn } = useContext(StaffAuthContext);

  const [designations, setDesignations] = useState([]);

  //get designations
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/designations`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch designations");
        }
        const data = await response.json();
        setDesignations(data); // Assuming the response data is an array of designations
      } catch (error) {
        console.error("Error fetching designations:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchDesignations();
  }, []);

  //to tool tip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You can only update editable marked(edit icon) fields only according to
      company policies.If there is a issue contact system admin or follow the
      protocol.
    </Tooltip>
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: employee });

  // State to track selected position
  const [selectedPosition, setSelectedPosition] = useState(employee.position);

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // Update selected position
  };

  const onSubmit = async (data) => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const formData = new FormData();

      // Append regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.patch(
        `${process.env.React_App_Backend_URL}/api/hr/update-employee/${employee.id}`,
        Object.fromEntries(formData.entries())
      );

      if (!response.status === 200) {
        throw new Error("Failed to update data");
      }

      // Optionally update the UI or perform any other actions after successful submission
      // Assuming onUpdate is a function to update the UI with the updated data
      console.log("Data updated successfully:", response.data);
      const result = response.data;
      const email = result.employee.email;

      // Close the modal or redirect to another page after successful submission
      //onUpdate();
      //onHide(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      onUpdate();
    }
  };

  const [isCnomValid, setIsCnomValid] = useState(false);

  const handleContactChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^[0-9]{10}$/.test(inputValue);
    setIsCnomValid(isValidInput);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Update Employee{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant="link" className="p-0 ml-2">
              <i className="bi bi-info-circle text-primary"></i>
            </Button>
          </OverlayTrigger>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Label>First Name</Form.Label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.firstName?.message}
              </Form.Text>
            </Form.Group>

            {/* Last Name */}
            <Form.Group as={Col} controlId="formGridLname">
              <Form.Label>Last Name</Form.Label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.lastName?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Birth Date */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridBdate">
              <Row>
                <Form.Label>Birth Date</Form.Label>
              </Row>
              <Row>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value || null}
                      onChange={(date) => field.onChange(date)}
                      className="form-control mx-2"
                      disabled
                    />
                  )}
                />
              </Row>
              <Form.Text className="text-danger">
                {errors.birthDate?.message}
              </Form.Text>
            </Form.Group>

            {/* NIC */}
            <Form.Group as={Col} controlId="formGridNic">
              <Form.Label>NIC</Form.Label>
              <Controller
                name="nic"
                control={control}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.nic?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Address */}
          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>
              Address <i className="bi bi-pencil-square"></i>
            </Form.Label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <>
                  <Form.Control
                    placeholder="1234 Main St"
                    {...field}
                    isInvalid={!!errors.address}
                    isValid={field.value && !errors.address}
                  />
                  {field.value && !errors.address && (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  )}
                </>
              )}
            />
            <Form.Text className="text-danger">
              {errors.address?.message}
            </Form.Text>
          </Form.Group>

          {/* Gender */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <div className="mb-3">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Form.Select {...field} disabled>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  )}
                />
              </div>
              <Form.Text className="text-danger">
                {errors.gender?.message}
              </Form.Text>
            </Form.Group>

            {/* Contact No. */}
            <Form.Group as={Col} controlId="formGridContact">
              <Form.Label>Contact No.</Form.Label>
              <Controller
                name="contact"
                control={control}
                rules={{
                  required: "Contact No. is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // Regex pattern for 10-digit numbers
                    message: "Contact No. must be a 10-digit number",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="0715897598"
                      {...field}
                      onChange={(e) => {
                        // Remove non-numeric characters and limit to maximum length
                        const input = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        field.onChange(input);
                      }}
                      maxLength="10" // Set maximum length
                    />

                    {field.value?.length === 10 && (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    )}

                    {errors.contact && (
                      <Form.Text className="text-danger">
                        {errors.contact.message}
                      </Form.Text>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Row>

          {/* Start Date */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridSdate">
              <Row>
                <Form.Label>Start date</Form.Label>
              </Row>
              <Row>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="form-control mx-2"
                      disabled
                    />
                  )}
                />
              </Row>
              <Form.Text className="text-danger">
                {errors.startDate?.message}
              </Form.Text>
            </Form.Group>

            {/* Position */}
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>
                Position <i className="bi bi-pencil-square"></i>
              </Form.Label>
              <Controller
                name="position"
                control={control}
                rules={{ required: "Position is required" }}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePositionChange(e); // Call function to update selected position
                    }}
                    disabled={
                      userPosition !== "HR Manager" &&
                      userPosition !== "General Manager"
                    }
                  >
                    <option value="">Choose...</option>
                    {designations.map((designation) => (
                      <option
                        key={designation._id}
                        value={designation.position}
                      >
                        {designation.position}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              <Form.Text className="text-danger">
                {errors.position?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Other Details */}
          <Form.Group className="mb-3" controlId="formGridExtra">
            <Form.Label>
              Other Details <i className="bi bi-pencil-square"></i>
            </Form.Label>
            <Controller
              name="otherDetails"
              control={control}
              render={({ field }) => (
                <Form.Control as="textarea" rows={3} {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.otherDetails?.message}
            </Form.Text>
          </Form.Group>

          {/* System Credentials */}
          {/* Email */}
          {/* Conditional rendering of credentials based on selected position */}
          {/*{selectedPosition !== "Technician" && (
            <Row className="mb-3 credentials">
              <h5 className="text-dark">System Credentials</h5>
              <h6 className="text-primary">
                *Only needed for manager or supervisor
              </h6>
              
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Email <i className="bi bi-pencil-square"></i>
                </Form.Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...field}
                    />
                  )}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

             
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Password <i className="bi bi-pencil-square"></i>
                </Form.Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
                      message:
                        "Password must have at least one uppercase letter, one number, one symbol, and be at least 8 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...field}
                      pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$"
                    />
                  )}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>
            </Row>
          )}*/}

          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide} className="mr-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmployeeUpdateModal;
