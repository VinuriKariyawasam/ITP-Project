import React from "react";
import Header from "../CusHeader/Header";

import Feedback from "../CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "../CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "../CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "../CUSMain/CUS_CAM/AllFeedbacks";
import ContactUsDash from "../../CAM/CAM_main/contactusDash";
import FAQ from "../CUSMain/CUS_CAM/FAQ";
import {CusAuthContext} from "../../../context/cus-authcontext";
import { useContext } from "react";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function CUSAffairs() {
  const CusAuth = useContext(CusAuthContext);
  return (
    <>

      <Routes> 
        <Route path="/allfeedback/*" element={<AllFeedbacks/>}></Route>
        <Route path="/feedback/*" element={<Feedback/>}></Route>
        <Route path="myfeedback/*" element={<MyFeedback/>}></Route>
        <Route path="/consultation/*" element={<OnlineConsultation/>}></Route>
        <Route path="/contactDash*" element={<ContactUsDash />} />
        <Route path="/faq/*" element={<FAQ/>}></Route>
    
     </Routes>

    </>
  );
}

export default CUSAffairs;