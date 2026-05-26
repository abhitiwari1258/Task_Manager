import React from 'react'
import {useState} from 'react'
import API from '../services/api'
import {useNavigate, useNavigation} from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [form,setForm] = useState({
        email:'',
        password:''
    })

    const handleChange = (e)=>{
        setForm({...form, [e.target.name] : e.target.value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const res = await API.post("/auth/login",form)

            localStorage.setItem("token",res.data.token)

            navigate("/dashboard")
        }catch(err){
            console.log(err.response?.data ||err.message);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      name="email"
      placeholder='email'
      onChange={handleChange}
      />

      <input 
      type="password"
      name="password"
      placeholder='password'
      onChange={handleChange}
      />

      <button>Login</button>
    </form>
  )
}

export default Login
