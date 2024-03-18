import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmployeeUpdateModal({ show, onHide, employee, onUpdate }) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: employee });

  const onSubmit = (data) => {
    onUpdate(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => <Form.Control {...field} />}
            />
            <Form.Text className="text-danger">
              {errors.firstName && errors.firstName.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => <Form.Control {...field} />}
            />
            <Form.Text className="text-danger">
              {errors.lastName && errors.lastName.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Controller
              name="birthDate"
              control={control}
              rules={{ required: "Birth Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => setValue("birthDate", date)}
                  className="form-control"
                />
              )}
            />
            <Form.Text className="text-danger">
              {errors.birthDate && errors.birthDate.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              )}
            />
            <Form.Text className="text-danger">
              {errors.gender && errors.gender.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formContact">
            <Form.Label>Contact</Form.Label>
            <Controller
              name="contact"
              control={control}
              rules={{ required: "Contact is required" }}
              render={({ field }) => <Form.Control {...field} />}
            />
            <Form.Text className="text-danger">
              {errors.contact && errors.contact.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPosition">
            <Form.Label>Position</Form.Label>
            <Controller
              name="position"
              control={control}
              rules={{ required: "Position is required" }}
              render={({ field }) => <Form.Control {...field} />}
            />
            <Form.Text className="text-danger">
              {errors.position && errors.position.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formOtherDetails">
            <Form.Label>Other Details</Form.Label>
            <Controller
              name="otherDetails"
              control={control}
              render={({ field }) => (
                <Form.Control as="textarea" rows={3} {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.otherDetails && errors.otherDetails.message}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EmployeeUpdateModal;
