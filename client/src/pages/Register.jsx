import React from 'react'
import { useState } from 'react'
import API from '../services/api'
const Register = () => {
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    })
    console.log(form)

    const handleChange = (e)=>{
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const res = await API.post("/auth/register",form)
            console.log(res.data)
        }catch(error){
            console.log(error.responce.data)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='name'
        name='name'
        onChange={handleChange}
        />

        <input 
        type="email" 
        placeholder='email'
        name='email'
        onChange={handleChange}
        />

        <input 
        type="password" 
        placeholder='password'
        name='password'
        onChange={handleChange}
        />

        <button>Register</button>
    </form>
  )
}

export default Register
