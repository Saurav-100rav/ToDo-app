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
    extraReducers: (builder) => {
        builder
          .addCase(fetchTasks.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tasks = action.payload;
          })
          .addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
        //   .addCase(fetchProductDetails.pending, (state) => {
        //     state.single_product_status = 'loading';
        //   })
        //   .addCase(fetchProductDetails.fulfilled, (state, action) => {
        //     state.single_product_status = 'succeeded';
        //     state.single_product = action.payload;
        //   })
        //   .addCase(fetchProductDetails.rejected, (state, action) => {
        //     state.single_product_status = 'failed';
        //     state.single_product_error = action.error.message;
        //   });
      },
})

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer