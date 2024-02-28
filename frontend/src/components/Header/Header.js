import React from "react";
import "./Header.css";
import "./Logo";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Nav from "./Nav/Nav";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/*{logo}*/}
      <Logo />
      {/*{serch bar}*/}
      <SearchBar />
      {/*{nav}*/}
      <Nav />
    </header>
  );
}

export default Header;
