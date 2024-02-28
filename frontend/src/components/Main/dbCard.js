import React from "react";
import Card from "react-bootstrap/Card";

const dbCard = ({ title, value, iconClass }) => {
  return (
    <div className="col-lg-4">
      <Card bg="white" text="black" className="shadow-lg">
        <Card.Body>
          <Card.Title>
            {title}
            <i className={`bi ${iconClass} fa-9x float-end`}></i>
          </Card.Title>
          <Card.Text>
            <h2 className="mb-2 text-body-secondary">{value}</h2>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default dbCard;
