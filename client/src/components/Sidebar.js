import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import "bootstrap/dist/css/bootstrap.css";

const Sidebar = () => {
  // Add state and functionality for collapsible items if necessary

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      
      <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </NavLink>
      
      <hr className="sidebar-divider my-0" />
      
      {/* ... rest of sidebar items, converted to <NavLink> components ... */}
      
    </ul>
  );
};

export default Sidebar;
