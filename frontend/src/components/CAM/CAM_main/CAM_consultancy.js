import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import ConsultancyPage from './ConsultancyPage';
import ConsultancySolution from './ConsultancySolution';


// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";


  function CAM_consultancy({ toggleLoading }){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="Consultancy Support" url="/staff/cam/con_support" />
       <Routes>
         <Route path="/*" element={<ConsultancyPage toggleLoading={toggleLoading}/>} />
         <Route path="consultDetails/:consultId" element={<ConsultancySolution toggleLoading={toggleLoading}/>}></Route>
       </Routes>
    </main>
    
    );
  }

  export default CAM_consultancy;