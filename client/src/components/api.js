import axios from "axios"
// const url = "http://localhost:9000/api/v1"
const url = "https://to-do-react-crud-app.onrender.com"

const addapi = async(obj)=>{
        try {
            const res = await axios.post(`${url}/add`,obj)
            return res;
        } catch (error) {
            console.log("Error while adding user...",error);
            return error;
        }
    }

const readapi = async()=>{
    try {
        const res = await axios.get(`${url}/display`)
        return res;
    } catch (error) {
        console.log("Error while displaying...",error)
        return error;
    }
}    

const finddataapi = async(id)=>{
    try {
        const res = await axios.get(`${url}/display/${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const updatetaskapi = async(id,data)=>{
    try {
        const result = await axios.put(`${url}/edit/${id}`,{data})
        console.log(result)
        return(result);
    } catch (error) {
        console.log("error while updating....",error);
        // console.log("2",error.response.data.errors.data.message);
        return(error.response.data.errors.data.message)
    }
}

const deleteapi = async(id)=>{
    try {
        const result = await axios.delete(`${url}/delete/${id}`)
        console.log(result)
        alert("Task Deleted Successfully.")
        return(result);
    } catch (error) {
        alert(error);
        console.log("error while deleting....",error)
        return(error)
    }
}
    export {addapi,readapi,finddataapi,updatetaskapi,deleteapi}