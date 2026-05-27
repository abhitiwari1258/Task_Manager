import React from "react";
import { NavLink, useNavigate} from "react-router-dom";
const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token')

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate('/')
  }
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
        {token && (<NavLink to="/dashboard">Dashboard</NavLink>)}

        {token && (<button onClick={handleLogout}>Logout</button>)}
    </nav>
  );
};

export default Navbar;
