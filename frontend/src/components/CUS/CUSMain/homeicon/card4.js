import React, { useState, useEffect, useContext } from "react";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import Card from "react-bootstrap/Card";

function Card4() {
  const cusauth = useContext(CusAuthContext);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/cam/feedback/get-feedbacks`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        setFeedback(data.feedbacks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ marginTop: "3%", textAlign: "center" }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
        What people say about us
      </h2>
      <p className="cushomea" disabled>
        This will help you to find the perfection of our work.
      </p>
      <div className="homecard4-holder">
        {feedback.slice(-3).map((item, index) => (
          <Card key={index} style={{ width: "30%" }}>
            <Card.Body>
              <Card.Text style={{ marginTop: "6%", textAlign: "center" }}>
                {item.feedback}
              </Card.Text>
              <Card.Title
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {item.name}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Card4;
