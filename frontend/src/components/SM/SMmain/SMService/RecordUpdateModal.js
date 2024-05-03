import React, { useState,useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  Modal,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
 // Card
  //Image
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUpload from "../../SMUtil/ImageUpload";
import FileUpload from "../../SMUtil/FileUpload";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";

function RecordUpdateModal({ show, onHide, record, onUpdate })  {
   //to redirect after success
   const navigate = useNavigate();

  //file uplood funxtions
  // State to store the uploaded files
  // State to store the uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

   //File input handler for SingleFileUpload component
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

  const onSubmit = async (data) => {
    try {
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
        `${process.env.React_App_Backend_URL}/api/sm/update-record/${record.id}`,
        Object.fromEntries(formData.entries())
      );

      if (!response.status === 200) {
        throw new Error("Failed to update data");
      }

      // Redirect to the specified URL after successful submission
      navigate("/staff/sm/record");
      // Optionally update the UI or perform any other actions after successful submission
      onUpdate(response.data); // Assuming onUpdate is a function to update the UI with the updated data

      // Close the modal or redirect to another page after successful submission
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
 
//chatgpt part
  useEffect(() => {
    // Code to run on component mount
    console.log("Component mounted");

    return () => {
      // Code to run on component unmount (cleanup)
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array means the effect runs only once on mount




  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
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

     )

          <Button variant="dark" type="submit">
            update
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