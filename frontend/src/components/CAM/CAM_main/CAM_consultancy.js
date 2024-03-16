import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import ConsultancyPage from './ConsultancyPage';

// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import AddReply from './AddReply';
import AllReplies from './AllReplies';

  function CAM_consultancy(){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="Consultancy Support" url="CAM/con_support" />
       <Routes>
         <Route path="/" element={<ConsultancyPage/>} />
         <Route path="reply" element={<AddReply/>}></Route>
         <Route path="all" element={<AllReplies/>}></Route>
       </Routes>
    </main>
    
    );
  }

  export default CAM_consultancy;