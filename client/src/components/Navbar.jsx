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
      className="flex justify-between items-center px-8 py-4 bg-slate-900 text-white shadow-md"
    >
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <div className="flex gap-4">{!token && (
        <>
          <NavLink to="/" className="hover:text-blue-400">Login</NavLink>
          <NavLink to="/register" className="hover:text-blue-400">Register</NavLink>
        </>
      )}</div>
        
        {token && (<NavLink to="/dashboard" className="hover:text-blue-400">Dashboard</NavLink>)}

        {token && (<button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">Logout</button>)}
    </nav>
  );
};

export default Navbar;
