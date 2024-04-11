import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const MoreReviewsModal = ({ show, handleClose, reviews, employeeId }) => {
  // Filter reviews for the specific employee

  const filteredReviews = reviews.filter(
    (reviews) => reviews.empDBId === employeeId
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredReviews.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Review</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.type}</td>
                  <td>{review.review}</td>
                  <td>
                    <Button variant="primary">Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No Reviews Currently</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoreReviewsModal;
