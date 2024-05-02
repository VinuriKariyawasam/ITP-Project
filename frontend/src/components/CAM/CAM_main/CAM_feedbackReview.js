import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import FeedbackReview from './FeedbackReview';

// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

  function CAM_feedbackReview({ toggleLoading }){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="FeedBack Review" url="/staff/cam/feedback_review" />
       <Routes>
       <Route path="/*" element={<FeedbackReview toggleLoading={toggleLoading}/>} />
       </Routes>
    </main>
    
    );
  }

  export default CAM_feedbackReview;