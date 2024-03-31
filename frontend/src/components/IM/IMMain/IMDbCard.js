import React from "react";
import Card from "react-bootstrap/Card";
const dbCard = ({ title, value1,value2, iconClass, duration }) => {
  return (
    <div className="col-lg-4">
      <Card bg="white" text="black" className="shadow-lg">
        <Card.Body>
          <Card.Title>
            {title}
            <span>|{duration} </span>
            <i className={`bi ${iconClass} fa-9x float-end`}></i>
          </Card.Title>
          <Card.Text>
            <h2 className="mb-2 text-body-secondary">
              {title === "Total Salaries"
                ? "Rs." + value1.toLocaleString("en-US")
                : value1.toLocaleString("en-US")}
            </h2>
            <h2 className="mb-2 text-body-secondary">
              {title === "Total Salaries"
                ? "Rs." + value2.toLocaleString("en-US")
                : value2.toLocaleString("en-US")}
            </h2>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default dbCard;
