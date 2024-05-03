import React, { useState, useEffect } from "react";
import CAM_dbCard from "./CAM_dbcard";
import ConsultancyPage from "./ConsultancyPage";

function CAM_dashboard({ toggleLoading }) {
  const [consultationCount, setConsultationCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/get-issues`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        const count = data.consultations.length;
        setConsultationCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchConsultations();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/cam/feedback/get-feedbacks`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        const count = data.feedbacks.length;
        setFeedbackCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchFeedbacks();
  }, []);

  const reviewsCount = consultationCount + feedbackCount;

  return (
    <section>
      <div className="col">
        <div className="row">
          <CAM_dbCard
            title="Total Questions"
            value={consultationCount}
            iconClass="bi-people-fill"
            duration="Today"
          />
          <CAM_dbCard
            title="Total FeedBack"
            value={feedbackCount}
            iconClass="bi bi-card-checklist"
            duration="Today"
          />
          <CAM_dbCard
            title="Reviews"
            value={reviewsCount}
            iconClass="bi bi-clipboard2-data"
            duration="Today"
          />
        </div>
      </div>
    </section>
  );
}

export default CAM_dashboard;