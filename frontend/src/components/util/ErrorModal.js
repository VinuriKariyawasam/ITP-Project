import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom"; // Import useHistory to navigate

const ErrorModal = ({
  show,
  handleClose,
  title,
  errorMessage,
  errorIcon,
  navigateTo,
}) => {
  const history = useHistory();

  const handleOkClick = () => {
    if (navigateTo) {
      history.push(navigateTo); // Navigate to the specified route
    }
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={errorIcon}
          alt="Error Icon"
          style={{ width: "50px", height: "50px" }}
        />
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleOkClick}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
