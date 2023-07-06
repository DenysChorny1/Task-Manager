import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return response.data;
  });

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const newTask = {
    id: uuidv4(),
    ...task,
  };
  return newTask;
//   const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
//   console.log(response.data)
//   return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
    if (!task.id) {
      throw new Error('Invalid task object. Missing id property.');
    }
    return task;
    // const { id, title, description, completed } = task;
    // const updatedTask = { title, description, completed };
  
    // const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTask);
    // return response.data;
  });

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  //await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
  return taskId;
});
// I save all data local because Api what i use can`t get new task with unique id.
// When i post new task, server give me all new tasks with id 201

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingTaskIndex = state.findIndex(task => task.id === id);
        if (existingTaskIndex !== -1) {
          state[existingTaskIndex] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        return state.filter(task => task.id !== taskId);
      });
  },
});

export default tasksSlice.reducer;