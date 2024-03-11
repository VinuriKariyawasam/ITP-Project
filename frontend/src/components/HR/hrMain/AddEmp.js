import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEmp() {
  //for date picker
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Create Employee</h3>

      {/* First Name */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>First Name</Form.Label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <Form.Control placeholder="Sahan" {...field} />
            )}
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
            render={({ field }) => (
              <Form.Control placeholder="Siriwardana" {...field} />
            )}
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
              rules={{ required: "Birth Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="form-control mx-2"
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
            rules={{ required: "NIC is required" }}
            render={({ field }) => (
              <Form.Control placeholder="791161645v" {...field} />
            )}
          />
          <Form.Text className="text-danger">{errors.nic?.message}</Form.Text>
        </Form.Group>
      </Row>

      {/* Address */}
      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <Form.Control placeholder="1234 Main St" {...field} />
          )}
        />
        <Form.Text className="text-danger">{errors.address?.message}</Form.Text>
      </Form.Group>

      {/* Gender */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <div className="mb-3">
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <>
                  <Form.Check
                    inline
                    label="Male"
                    name="gender"
                    type="radio"
                    value="male"
                    id={`male`}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur(e);
                    }}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type="radio"
                    value="female"
                    id={`female`}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur(e);
                    }}
                  />
                </>
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
            rules={{ required: "Contact No. is required" }}
            render={({ field }) => (
              <Form.Control type="tel" placeholder="0715897598" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.contact?.message}
          </Form.Text>
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
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="form-control mx-2"
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
          <Form.Label>Position</Form.Label>
          <Controller
            name="position"
            control={control}
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <Form.Select defaultValue="Choose..." {...field}>
                <option>Choose...</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Service Manager">Service Manager</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Technician">Technician</option>
              </Form.Select>
            )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      {/* Add a photo and other documents */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Add a photo *(.jpg, .jpeg, .png only)</Form.Label>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <>
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur(e);
                  }}
                />
              </>
            )}
          />
          <Form.Text className="text-danger">{errors.photo?.message}</Form.Text>
        </Form.Group>
        {/* Documents */}
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add other documents *(.pdf only)</Form.Label>
          <Controller
            name="documents"
            control={control}
            render={({ field }) => (
              <>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur(e);
                  }}
                />
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.documents?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      {/* Other Details */}
      <Form.Group className="mb-3" controlId="formGridExtra">
        <Form.Label>Other Details</Form.Label>
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
      <Row className="mb-3">
        <h5 className="text-dark">System Credentials</h5>
        <h6 className="text-primary">*Only need for manager or supervisor</h6>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
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
              <Form.Control type="email" placeholder="Enter email" {...field} />
            )}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        {/* Password */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Form.Control type="password" placeholder="Password" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddEmp;
