import React from "react";
import PeriodicalAppointment from "../CUSMain/CUSAppointment/PeriodicalAppointment";
import MechanicalAppointment from '../CUSMain/CUSAppointment/MechanicalAppointment'
import MyAppointment from '../CUSMain/CUSAppointment/MyAppointment'
import AppointnmentMain from '../CUSMain/CUSAppointment/AppoinmentMain'
import AccidentalAppointment from '../CUSMain/CUSAppointment/AccidentalAppointment'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function CUSAppointment({ toggleLoading }) {
  return (
    <>

    
    <Routes>
    <Route path="periodicalappointment/" element={<PeriodicalAppointment toggleLoading={toggleLoading}/>} />
    <Route path="mechanicalAppointment/" element={<MechanicalAppointment toggleLoading={toggleLoading}/>} />
    <Route path="myappointment/" element={<MyAppointment toggleLoading={toggleLoading}/> } />
    <Route path="appointnmentMain/" element={<AppointnmentMain toggleLoading={toggleLoading}/>} />
    <Route path="accidentalAppointment/" element={<AccidentalAppointment toggleLoading={toggleLoading}/>} />
    </Routes>
    </>
  );

}

export default CUSAppointment;
