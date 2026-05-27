import React, { useState, useEffect } from 'react'
import API from '../services/api'
const Dashboard = () => {
  const [tasks,setTasks] = useState([])
  // console.log(tasks)

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
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Task</h2>

      {tasks.map((task)=>
        <div key={task._id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority:{task.priority}</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
