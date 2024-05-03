import React, { useState, useEffect } from "react";
import { Modal, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";

const MoreReviewsModal = ({
  show,
  handleClose,
  reviews,
  employeeId,
  toggleLoading,
}) => {
  const [updatedReviews, setUpdatedReviews] = useState([]);

  useEffect(() => {
    setUpdatedReviews(reviews);
  }, [reviews]);

  // Function to delete a review
  const handleDelete = async (reviewId) => {
    try {
      toggleLoading(true);
      // Make a DELETE request to delete the review
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/reviews/delete/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Update the reviews list after successful deletion
      setUpdatedReviews(
        updatedReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  // Filter reviews for the specific employee
  const filteredReviews = updatedReviews.filter(
    (review) => review.empDBId === employeeId
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Employee Reviews{" "}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-top">
                Cannot update reviews that use for evalutions. You can delete
                reviews if want and it will reset grading points. Then again you
                can add new reviews.
              </Tooltip>
            }
          >
            <div>
              <i
                className="bi bi-info-circle"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              ></i>
            </div>
          </OverlayTrigger>
        </Modal.Title>
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
                    <Button
                      variant="primary"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </Button>
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
