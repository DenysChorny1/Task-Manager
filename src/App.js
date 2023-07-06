import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchTasks, addTask } from './store/tasksSlice';
import AllTasks from './components/AllTasks'
import InProgressTasks from './components/InProgressTasks'
import CompleteTasks from './components/CompleteTasks'
import Search from './components/Search';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [taskModal, setTaskModal] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([]);
  

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm]);
  
  const filterTasks = () => {
    const updatedFilteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
    setFilteredTasks(updatedFilteredTasks);
  };
  
  const handleDateSearch = () => {
    const updatedFilteredTasks = tasks.filter(task =>
      task.deadline === searchDate
    );
  
    setFilteredTasks(updatedFilteredTasks);
  };

  const handleSearch = () => {
    setFilteredTasks([]);
    filterTasks();
    if (searchDate !== '') {
      handleDateSearch();
    }
    setSearchDate('')
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleAddTask = () => {
    const taskWithDefaultStatus = {
      ...newTask,
      completed: false,
    };
    setTaskModal(false)
    dispatch(addTask(taskWithDefaultStatus));
  };

  return (
    <Router>
      <div className='container-fluid '>
        <div className='row p-md-5 bg-dark navbar navbar-dark'>
          <h1 className='col-12 text-center p-1 text-white'>Task Manager</h1>
          <nav className='col-md-2'>
            <ul className='nav'>
              <li className='nav-item'>
                <Link className='nav-link' to="/">All</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/inProgress">In Progress</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/complete">Complete</Link>
              </li>
            </ul>
          </nav>
          <Search 
            searchTerm={searchTerm}
            searchDate={searchDate}
            handleSearch={handleSearch}
            handleSearchTermChange={handleSearchTermChange}
            handleSearchDateChange={handleSearchDateChange}
          />
          <div className='col-md-2 d-flex justify-content-end'>
            {!taskModal && (
                <button className='btn btn-secondary' onClick={() => setTaskModal(true)}>
                  New Task +
                </button>
              )}
              {taskModal && (
                <div className='my_modal bg-dark bg-opacity-50' onClick={() => setTaskModal(false)}>
                  <Modal
                    newTask={newTask}
                    setNewTask={setNewTask}
                    handleAddTask={handleAddTask}
                  />
                </div>
            )}
          </div>
          
        </div>
        <div className='container py-3'>
          <Routes>
            <Route path="/" element={<AllTasks tasks={filteredTasks} />} />
            <Route path="/inprogress" element={<InProgressTasks tasks={filteredTasks} />} />
            <Route path="/complete" element={<CompleteTasks tasks={filteredTasks} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;