import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import ConsultancyPage from './ConsultancyPage';
import AddReply from './AddReply';
import UpdateSolution from './UpdateSolution';


// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";


  function CAM_consultancy(){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="Consultancy Support" url="/cam/con_support" />
       <Routes>
         <Route path="/*" element={<ConsultancyPage/>} />
         <Route path="addreply" element={<AddReply/>}/>
         <Route path="edit-solution/:id" element={<UpdateSolution/>} />
       </Routes>
    </main>
    
    );
  }

  export default CAM_consultancy;