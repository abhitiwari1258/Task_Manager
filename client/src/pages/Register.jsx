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
    <div className='flex justify-center items-center h-screen bg-slate-100'>
    <form className='bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]' onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold">Register</h2>

        <input 
        type="text" 
        placeholder='name'
        name='name'
        onChange={handleChange}
        className='border p-3 rounded outline-none focus: border-blue-500'
        />

        <input 
        type="email" 
        placeholder='email'
        name='email'
        onChange={handleChange}
        className='border p-3 rounded outline-none focus: border-blue-500'
        />

        <input 
        type="password" 
        placeholder='password'
        name='password'
        onChange={handleChange}
        className='border p-3 rounded outline-none focus: border-blue-500'
        />

        <button className='bg-blue-500 text-white rounded-2xl py-3 hover:to-blue-600 transition'>Register</button>
    </form>
    </div>
  )
}

export default Register
