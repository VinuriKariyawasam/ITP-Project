import React from 'react'
import NavItem from "./NavItem";
import navList from "../../../data/Finance/financeNavItems"

const FinanceSideBar = () => {
 
    return (
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            {navList.map((nav) => (
              <NavItem key={nav._id} nav={nav} />
            ))}
          </ul>
        </aside>
      );
  
}

export default FinanceSideBar;