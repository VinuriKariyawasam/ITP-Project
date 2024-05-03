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



function CUSAffairs({ toggleLoading }) {
  const CusAuth = useContext(CusAuthContext);
  return (
    <>

      <Routes> 
        <Route path="/allfeedback/*" element={<AllFeedbacks toggleLoading={toggleLoading}/>}></Route>
        <Route path="/feedback/*" element={<Feedback toggleLoading={toggleLoading}/>}></Route>
        <Route path="myfeedback/*" element={<MyFeedback toggleLoading={toggleLoading}/>}></Route>
        <Route path="/consultation/*" element={<OnlineConsultation toggleLoading={toggleLoading}/>}></Route>
        <Route path="/contactDash*" element={<ContactUsDash toggleLoading={toggleLoading}/>} />
        <Route path="/faq/*" element={<FAQ toggleLoading={toggleLoading}/>}></Route>
    
     </Routes>

    </>
  );
}

export default CUSAffairs;