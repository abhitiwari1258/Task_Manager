import React from "react";
import { useState } from "react";
import API from "../services/api";
import { useNavigate, useNavigation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true)
      const res = await API.post("/auth/login", form);

      if (!res.data.token) {
        return alert("Invalid credentials");
      }

      // console.log(res.data);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center font-bold">Login</h2>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
          className="border p-3 rounded outline-none focus: border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded outline-none focus: border-blue-500"
        />

        <button 
        disabled={loading}
        className="bg-blue-500 text-white rounded-2xl py-3 hover:to-blue-600 transition">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
