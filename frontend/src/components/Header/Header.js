import React, { useContext } from "react";
import { StaffAuthContext } from "../../context/StaffAuthContext";
import "./Header.css";
import "./Logo";
import Logo2 from "./Logo2";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Nav from "./Nav/Nav";
import StaffAuthNav from "./Nav/StaffAuthNav";

function Header() {
  //const { isLoggedIn } = useContext(StaffAuthContext); // Access isLoggedIn state from StaffAuthContext
  const auth = useContext(StaffAuthContext);
  console.log("Auth:", auth);
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* Logo component always displayed */}
      {auth.isLoggedIn ? <Logo /> : <Logo2 />}

      {/* SearchBar component displayed only when logged in */}
      {/*{auth.isLoggedIn ? <SearchBar /> : null}*/}
      {/* Nav or AuthNav component displayed based on authentication status */}
      {auth.isLoggedIn ? <Nav /> : <StaffAuthNav />}
    </header>
  );
}

export default Header;
