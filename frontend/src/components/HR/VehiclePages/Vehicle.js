import React from "react";
import VehicleMain from "../vehicleMain/VehicleMain";
import VehicleSideBar from "../vehicleSidebar/VehicleSideBar";

//Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function Vehicle() {
  return (
    <>
      <VehicleSideBar />
      <Switch>
        <Route path="/vehicle/main" exact>
          <VehicleMain />
        </Route>
        <Redirect to="/vehicle/main" />
      </Switch>
    </>
  );
}

export default Vehicle;
