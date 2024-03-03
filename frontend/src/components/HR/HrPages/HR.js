import React from "react";
import HrMain from "../hrMain/HrMain";
import HrSideBar from "../hrSidebar/HrSideBar";

//Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function HR() {
  return (
    <>
      <HrSideBar />
      <Switch>
        <Route path="/hr/main" exact>
          <HrMain />
        </Route>
        <Redirect to="/hr/main" />
      </Switch>
    </>
  );
}

export default HR;
