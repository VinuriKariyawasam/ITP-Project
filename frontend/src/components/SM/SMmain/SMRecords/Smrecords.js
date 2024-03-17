import React from "react";

import SMPageTitle from "./SMPageTitle";
import Addrecord from "./Addrecord";
import RecDash from "./RecDash";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Smrecords() {
  return (
    <main id="main" className="main">
      <SMPageTitle title="Service Records" url="sm/record" />

      <Routes>
        <Route path="/" element={<RecDash />} />
        <Route path="add" element={<Addrecord />} />
      </Routes>
    </main>
  );
}

export default Smrecords;