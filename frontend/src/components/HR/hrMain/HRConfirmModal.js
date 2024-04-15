import React from "react";
import { Modal, Button } from "react-bootstrap";

const HRConfirmModal = ({
  show,
  onHide,
  title,
  message,
  onConfirm,
  btnColor,
  btnName,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant={btnColor} onClick={onConfirm}>
          {btnName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HRConfirmModal;
