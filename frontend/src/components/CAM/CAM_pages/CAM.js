import React from "react";
import CAM_main from "../CAM_main/CAM_main";
import CAM_sideBar from "../CAM_sidebar/CAM_sideBar";
import CAM_consultancy from "../CAM_main/CAM_consultancy";
import ContactDash from "../CAM_main/contactusDash";
import CAM_feedbackReview from "../CAM_main/CAM_feedbackReview";
import CAM_faqReview from "../CAM_main/CAM_faqReview";
import CAM_Reports from "../CAM_main/CAM_Reports";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function CAM() {
  return (
    <>
      <CAM_sideBar/>

      <Routes>
        <Route path="/" element={<CAM_main />} />
        <Route path="con_support/*" element={<CAM_consultancy/>} />
        <Route path="contactDash" element={<ContactDash/>} />
        <Route path="feedback_review/*" element={<CAM_feedbackReview/>}></Route>
        <Route path="faq_review/*" element={<CAM_faqReview/>}></Route>
        <Route path="reports/*" element={<CAM_Reports/>}></Route>

        
      </Routes>
    </>
  );
}

export default CAM;