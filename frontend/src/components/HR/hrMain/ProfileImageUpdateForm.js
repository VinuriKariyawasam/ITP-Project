import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import ImageUpload from "../HrUtil/ImageUpload";
import { useForm, Controller } from "react-hook-form";

const ProfileImageUpdateForm = ({
  show,
  handleClose,
  empId,
  onUploadPic,
  toggleLoading,
}) => {
  const { control, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      toggleLoading(true);
      const formData = new FormData(); // Create FormData object

      // Append form data
      formData.append("empId", empId); // Assuming you need to send empId along with the photo
      formData.append("photo", selectedFile); // Append the selected file

      console.log("Form data:", formData.get("photo"));
      // Perform fetch request to submit the form data
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/updateemployeephoto/${empId}`,
        {
          method: "POST",
          body: formData, // Send FormData instead of JSON.stringify(data)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Handle successful submission
      // For example, close the modal
      handleClose();
      onUploadPic(); // Call the callback function to update the profile picture
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error, e.g., show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Add a photo *(.jpg, .jpeg, .png only)</Form.Label>
            <Controller
              name="photo"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  id="photo"
                  onInput={(id, file, isValid) => {
                    setSelectedFile(file); // Update selected file state
                    field.onChange(file); // Trigger form field change
                    field.onBlur(); // Trigger form field blur for validation
                  }}
                  errorText={errors?.photo?.message}
                />
              )}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            style={{ margin: "5%" }}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileImageUpdateForm;
