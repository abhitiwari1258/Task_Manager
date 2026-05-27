import React, { useState, useEffect } from 'react'
import API from '../services/api'
const Dashboard = () => {
  const [tasks,setTasks] = useState([])
  const [form,setForms] = useState({
    title:"",
    description:"",
    priority:"Low"
  })

  // console.log(form)

  useEffect(()=>{
    fetchTasks();
  },[])

  const fetchTasks = async()=>{
    try{
      const token = localStorage.getItem('token')
      // console.log(token)

      const res = await API.get('/task', {headers:{Authorization : `Bearer ${token}`}});
      console.log(res.data)
      setTasks(res.data);

    }catch(error){
      console.log(error.response?.data)
    }
  }

  const handleChange = (e)=>{
    setForms({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const token = localStorage.getItem("token")

      await API.post('/task', form, {headers:{Authorization: `Bearer ${token}`}})

      setForms({
        title:"",
        description:"",
        priority:"Low"
      })

      fetchTasks()

    }catch(error){
      console.log(error.response?.data);
    }
  }

  const handleDelete = async(id)=>{
    try{
      const token = localStorage.getItem("token")

      await API.delete(`/task/${id}`, {headers:{Authorization: `Bearer ${token}`}})

      fetchTasks()
    }catch(error){
    console.log(error.response?.data);
  }
}
  return (
    <div>
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input type="text"
        name='title'
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        />

        <input type="text"
        name='description'
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        />

        <select name="priority"
        value={form.priority}
        onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button>Add Task</button>
      </form>
      <hr />

      <h2>My Task</h2>

      {tasks.map((task)=>
        <div key={task._id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority:{task.priority}</p>
          <button onClick={()=>handleDelete(task._id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
