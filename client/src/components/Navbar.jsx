import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid gray",
      }}
    >
        <NavLink to="/">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
};

export default Navbar;
