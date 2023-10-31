import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Mock API URL (replace with your actual API endpoint)
const API_URL = 'https://to-do-react-crud-app.onrender.com';

// Define an async thunk to fetch products
export const fetchTasks = createAsyncThunk('Tasks/fetchTasks', async () => {
  const response = await axios.get(`${API_URL}/display`);
  console.log(response);
  return response.data;
});

export const deleteTasks = createAsyncThunk('deleteTasks', async (id,{rejectWithValue}) => {
    try {
        // const response = await axios.get(`${API_URL}/display/${id}`);
        // console.log("Data to be deleted",response);
        const result = await axios.delete(`${API_URL}/delete/${id}`,{method : "DELETE"})
        console.log(id)
        return id;
    } catch (error) {
        return rejectWithValue(error)
    }
  });

const taskSlice = createSlice({
    name : 'Tasks',
    initialState : {
        tasks : [],
        status : null,
        error : null,
    },
    reducers : {
        addTask : (state,action)=>{
            state.tasks.push(action.payload);
        }
    },
    extraReducers:  {
        //   .addCase(fetchTasks.pending, (state) => {
        //     state.status = 'loading';
        //   })
        //   .addCase(fetchTasks.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.tasks = action.payload;
        //   })
        //   .addCase(fetchTasks.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        //   }),
          [fetchTasks.pending] : (state) => {
            state.status = 'loading';
          },
          [fetchTasks.fulfilled] : (state,action) => {
            state.status = 'succeeded';
            state.tasks = action.payload;
          },
          [fetchTasks.rejected] : (state,action) => {
            state.status = 'failed';
            state.error = action.error.message;
          },
          [deleteTasks.pending] : (state) => {
            state.status = 'loading';
          },
          [deleteTasks.fulfilled] : (state,action) => {
            state.status = 'succeeded';
            // console.log(action.payload)  a single data will come here which has to be deleted
            try {
                const id = action.payload;
                console.log(state.tasks.length);
                // const allTasks = state.tasks.filter((task)=> task._id !== id);
                // state.tasks = allTasks;
                console.log("after deleted",action.payload);
                state.tasks = state.tasks.filter((val)=> val._id !== id);
                // state.tasks = [];
                // state.tasks.map((val)=>{
                //     console.log(val._id,val._id===id,id);
                // })
            } catch (error) {
                return error;
            }
          },
          [deleteTasks.rejected] : (state,action) => {
            state.status = 'failed';
            state.error = action.error.message;
          }
      },
})

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer