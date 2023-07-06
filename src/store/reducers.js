import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;