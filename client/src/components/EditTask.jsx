import { useEffect, useState } from 'react';
import {  useParams,useNavigate } from 'react-router-dom';
import { finddataapi, updatetaskapi } from './api';

const EditTask = () => {
    const {id} = useParams(); //   id = useParams().id 
    const [data,settextValue] = useState("");
    useEffect( ()=>{
        get_info_to_edit()
    },[])
    const get_info_to_edit = async()=>{
            const single_data = await finddataapi(id)
            console.log(single_data)
            settextValue(single_data.data.data)
    }
    
    const changeText = (e)=>{
         settextValue(e.target.value)
    }
    const navigate = useNavigate()
    const updatetask = async()=>{
        // console.log(data);
        const result = await updatetaskapi(id,data);
        if(result.data==="Success"){
            alert("Updated Successfully.");
            navigate("/");
        }
    else
      alert(`Update unsuccessfull \nError : ${result}`); 
          
         
    }
  return (
    <div className='edit-task'>
        <h2>Edit your task</h2>
        <input type="text" id="text" name="data" value={data} onChange={changeText}/>
        <button id="add" onClick={updatetask}>Edit Task</button>
    </div>
  )
}

export default EditTask