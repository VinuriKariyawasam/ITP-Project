import React from "react";
import "./Header.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Nav from "./Nav/Nav";
import CusnavItem from '../../../data/CUS/CusnavItem'

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/*{logo}*/}
      <Logo />
      <CusnavItem/>
      {/*{serch bar}*/}
      <SearchBar />
      {/*{nav}*/}
      <Nav />
      
    </header>
  );
}

export default Header;
