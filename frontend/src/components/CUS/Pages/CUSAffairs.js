import React from "react";
import Header from "../CusHeader/Header";

import Feedback from "../CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "../CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "../CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "../CUSMain/CUS_CAM/AllFeedbacks";
import FAQ from "../CUSMain/CUS_CAM/FAQ";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function CUSAffairs() {
  return (
    <>

      <Routes> 
        <Route path="/allfeedback/*" element={<AllFeedbacks/>}></Route>
        <Route path="/feedback/*" element={<Feedback/>}></Route>
        <Route path="myfeedback/*" element={<MyFeedback/>}></Route>
        <Route path="/consultation/*" element={<OnlineConsultation/>}></Route>
        <Route path="/faq/*" element={<FAQ/>}></Route>
        
        
        
     </Routes>

    </>
  );
}

export default CUSAffairs;
