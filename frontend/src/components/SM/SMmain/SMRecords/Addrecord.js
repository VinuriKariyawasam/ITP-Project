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

function Addrecord() {
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
      <h3>Create Record</h3>

 {/* Vehicle Number */}
 <Form.Group className="mb-3" controlId="formVehiNumber">
        <Row>
        <Form.Label>Vehicle Number</Form.Label>
        </Row>
        <Row>
        <Controller
          name="vnumber"
          control={control}
          rules={{ required: "Vnumber is required" }}
          render={({ field }) => (
            <Form.Control placeholder="ANC8754" {...field} />
          )}
        />
        </Row>
        <Form.Text className="text-danger">{errors.vnumber?.message}</Form.Text>
      </Form.Group>
     


      {/* Start Date */}
       
        <Form.Group className="mb-3" controlId="formGridSDate">
          <Row>
            <Form.Label>Start Date</Form.Label>
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

        {/* Invoice number*/}
        <Form.Group className="mb-3" controlId="formGridINo">
          <Row>
          <Form.Label>Invoice Number</Form.Label>
          </Row>
          <Row>
          <Controller
            name="inumber"
            control={control}
            rules={{ required: "Invoice number is required" }}
            render={({ field }) => (
              <Form.Control placeholder="1123" {...field} />
            )}
          />
          </Row>
          <Form.Text className="text-danger">{errors.inumber?.message}</Form.Text>
        </Form.Group>
      

      
      {/* End Date */}
        <Form.Group className="mb-3" controlId="formGridEdate">
          <Row>
            <Form.Label>End date</Form.Label>
          </Row>
          <Row>
            <Controller
              name="EndDate"
              control={control}
              rules={{ required: "End Date is required" }}
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
            {errors.EndDate?.message}
          </Form.Text>
        </Form.Group>

       

      {/* Add a quotation and service reports */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Add the quotation*(.jpg, .jpeg, .png only)</Form.Label>
          <Controller
            name="quotation"
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
          <Form.Text className="text-danger">{errors.quotation?.message}</Form.Text>
        </Form.Group>
        {/* Documents */}
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add service report *(.pdf only)</Form.Label>
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
        <Row>
        <Form.Label>Other Details</Form.Label>
        </Row>
        <Row>
        <Controller
          name="otherDetails"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        </Row>
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

export default Addrecord;