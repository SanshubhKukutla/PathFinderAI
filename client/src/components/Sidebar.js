import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </NavLink>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>
      {/* Sidebar - Brand */}
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        Interface
      </div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <NavLink className="nav-link collapsed" to="/components">
          <i className="fas fa-fw fa-cog"></i>
          <span>Components</span>
        </NavLink>
      </li>
      {/* Nav Item - Utilities Collapse Menu */}
      <li className="nav-item">
        <NavLink className="nav-link collapsed" to="/utilities">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Utilities</span>
        </NavLink>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">
        Addons
      </div>
      {/* Nav Item - Pages Collapse Menu */}
      {/* Your other nav items here */}
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}

export default Sidebar;
