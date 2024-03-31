import React from 'react'

import Header from '../CusHeader/Header'
import PeriodicalAppointment from '../CUSMain/CUSAppointment/PeriodicalAppointment'
import MyAppointment from '../CUSMain/CUSAppointment/MyAppointment';
import Feedback from '../CUSMain/CUS_CAM/Feedback';
import OnlineConsultation from '../CUSMain/CUS_CAM/OnlineConsultation';
import MyFeedback from '../CUSMain/CUS_CAM/MyFeedback';
import AllFeedbacks from '../CUSMain/CUS_CAM/AllFeedbacks';
import FeedbackMain from '../CUSMain/CUS_CAM/FeedbackMain';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Customer() {
  return (
    <>
    <Header/>

    <Routes> 

    <Route path="/allfeedback/*" element={<AllFeedbacks/>}></Route>
    <Route path="/feedback" element={<Feedback/>}></Route>
    <Route path="/myfeedback/*" element={<MyFeedback/>}></Route>
    <Route path="/consultation/*" element={<OnlineConsultation/>}></Route>
    <Route path="/periodicalappointments" element={<PeriodicalAppointment/>} />
    <Route path="/MyAppointment" element={<MyAppointment/>} />

    
    </Routes>
    </>
  )
}

export default Customer

