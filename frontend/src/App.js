//import icons
import "bootstrap-icons/font/bootstrap-icons.css";
//import "remixicon/fonts/remixicon.css";

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";

import Common from "./components/Pages/Common";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/vehicle" component={HR} />
          <Route path="/" component={Common} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
