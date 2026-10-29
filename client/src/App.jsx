import React from 'react'
import { useState } from 'react'
import {api} from './api.js'
import { useEffect } from 'react'

const App = () => {
  const [title, setTitle] = useState("")
  const [tasks,setTasks] = useState([])

  async function fetchTask(){
    try{
      const response = await api.get('/tasks')
      setTasks(response.data)
    }
    catch(err){console.error(err)}
  }
  useEffect(()=>{
    fetchTask()
  },[])
  async function AddTask(){
    try{
      if(!title){return;}
      await api.post('/tasks',{title})
      setTitle("")
      fetchTask()
    }
    catch(err){console.error(err)}
  }
  return (
    <div>
      <h1>TASK MANAGER</h1>
      <div style={{ margin: "40px" }}>
        <input style={{ padding: "10px" }} type="text" placeholder="Enter a Task" value={title} 
        onChange={e => setTitle(e.target.value)} />
        <button style={{padding:"10px"}} onClick={AddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task=>(
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
