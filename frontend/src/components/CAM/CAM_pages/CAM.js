import React from "react";
import CAM_main from "../CAM_main/CAM_main";
import CAM_sideBar from "../CAM_sidebar/CAM_sideBar";
import CAM_consultancy from "../CAM_main/CAM_consultancy";
import ContactDash from "../CAM_main/contactusDash";
import CAM_feedbackReview from "../CAM_main/CAM_feedbackReview";
import CAM_faqReview from "../CAM_main/CAM_faqReview";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function CAM({ toggleLoading }) {
  return (
    <>
      <CAM_sideBar/>

      <Routes>
        <Route path="/" element={<CAM_main toggleLoading={toggleLoading}/>} />
        <Route path="con_support/*" element={<CAM_consultancy toggleLoading={toggleLoading}/>} />
        <Route path="contactDash" element={<ContactDash toggleLoading={toggleLoading}/>} />
        <Route path="feedback_review/*" element={<CAM_feedbackReview toggleLoading={toggleLoading}/>}></Route>
        <Route path="faq_review/*" element={<CAM_faqReview toggleLoading={toggleLoading}/>}></Route>
        

        
      </Routes>
    </>
  );
}

export default CAM;