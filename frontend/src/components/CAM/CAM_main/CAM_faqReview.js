import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import FAQReview from './FAQReview';


// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

  function CAM_faqReview({ toggleLoading }){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="FAQ Review" url="/staff/cam/faq_review" />
       <Routes>
       <Route path="/*" element={<FAQReview toggleLoading={toggleLoading}/>} />
       </Routes>
    </main>
    
    );
  }

  export default CAM_faqReview;