import React, { useState, useEffect } from 'react'
import { addapi, readapi, deleteapi } from './api'
import {useNavigate } from 'react-router-dom'
import trash from "./trash.png"
import edit from "./edit.png"
export default function ToDo() {

  const [info, settextValue] = useState({ data: "" });
  const changeText = (e) => {
    // const {name,value}=e.target
    settextValue({ [e.target.name]: e.target.value })
  }
  const navigate = useNavigate()

  const [infoarr, modifylist] = useState([]);

  useEffect(() => {
    displayall();
  }, [infoarr])

  const displayall = async () => {
    const all = await readapi()
    console.log(all.data.length);
    modifylist(all.data);
  }

  const addEvent = async () => {
    console.log(info, info.data)
    try {
      const res = await addapi(info);
      console.log(res);
      if(res.data.msg==="success")
          alert(`Task added successfully\n\n Task added : ${res.data.newData.data}`);
      else  
        alert(`Error : ${res.data.errors.data.message}`);  
      settextValue({data: "" });
    } catch (error) {
      alert("Error while Adding.",error);
      console.log(error);
    }
  }
  const edittask = (taskid) => {
    navigate(`/edit/${taskid}`)
  }
  const deletetask = async (taskid) => {
    const res = await deleteapi(taskid)
    if (res === "Success")
      alert("Successfully deleted.")
  }

  return (
    <div className="container">
      <h1 className="heading">Task  Manager - 3</h1>
      <div className="input-container">
        <input type="text" id="text" name="data" className="input-task" placeholder="Enter a task" value={info.data} onChange={changeText} />
        <button className="add-button" onClick={addEvent}>Add Task</button>
      </div>

      <div className="tasks">
          {
            infoarr.map((value)=>{
              return (
                  <div className="task">{
                    console.log(value._id)
                  }
                    <span>{value.data}</span>
                    {/* <hr /> */}
                    <div className="task-icons">
                        <img src={trash} alt="trash" className="delete-icon"  onClick={()=>deletetask(value._id)}/>
                        <img src={edit} alt="trash" className="edit-icon" onClick={()=>edittask(value._id)}/>
                    </div>
                  </div> 
              )
            })
          }
      </div>

      {/* <input type="text" id="text" name="data" value={info.data} onChange={changeText}/> */}
      {/* <button id="add" onClick={addEvent}>Add work</button> */}
      {/* <Link to="/showall"><button id='show'>show all tasks</button></Link> */}

    </div>
  )
}
