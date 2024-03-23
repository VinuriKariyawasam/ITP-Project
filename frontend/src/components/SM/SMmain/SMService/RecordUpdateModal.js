import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  Modal,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUpload from "../../SMUtil/ImageUpload";
import FileUpload from "../../SMUtil/FileUpload";

function RecordUpdateModal({ show, onHide, record, onUpdate }) {
  //file uplood funxtions
  // State to store the uploaded files
  // State to store the uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

  // File input handler for SingleFileUpload component
  const fileInputHandler = (id, file, isValid) => {
    if (isValid) {
      // Set the uploaded file in state
      setUploadedFile(file);
    } else {
      // Handle invalid files if needed
      console.log("Invalid file:", file);
    }
  };

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
  } = useForm({ defaultValues: record });

  const onSubmit = (data) => {
    onUpdate(data);
    onHide();
  };

  // State to track selected position
  const [selectedPosition, setSelectedPosition] = useState("");

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // Update selected position
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Update Record{" "}
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
          <Form.Label>Add the quotation *(.jpg, .jpeg, .png only)</Form.Label>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="photo" // Pass the ID for the ImageUpload component
                onInput={(id, file, isValid) => {
                  field.onChange(file); // Trigger the onChange event for the photo field
                  field.onBlur(); // Trigger the onBlur event for validation
                }}
                errorText={errors.photo?.message}
              />
            )}
          />
        </Form.Group>
        {/* Documents */}
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add other documents *(.pdf only)</Form.Label>
          <FileUpload
            id="documents"
            accept=".pdf"
            onInput={fileInputHandler}
            errorText={errors.documents?.message}
          />
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
            rules={{ required: "Password is required" ,
            pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
                message:
                  "Password must have at least one uppercase letter, one number, one symbol, and be at least 8 characters long",
              },}}
            render={({ field }) => (
              <Form.Control type="password" placeholder="Password" {...field}
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$" />
            )}
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
      </Row> )

          <Button variant="dark" type="submit">
            Submit
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

export default RecordUpdateModal;