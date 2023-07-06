import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/tasksSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
    deadline: task.deadline,
  });

  const handleSaveTask = () => {
    const currentDateTime = new Date().toISOString().split('T')[0];
    if (updatedTask.deadline < currentDateTime) {
      alert('Cannot set a past date as the deadline');
      return;
    }

    dispatch(updateTask({ ...task, ...updatedTask }));
    setEditingTask(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value === 'true';
    setCompleted(newStatus);
    dispatch(updateTask({ ...task, completed: newStatus }));
  };

  const handleDeadlineChange = (e) => {
    const newDeadline = e.target.value;
    setUpdatedTask({ ...updatedTask, deadline: newDeadline });
  };

  return (
    <div className='col-md-3 p-1'>
        <div className='p-2 card h-100 d-flex flex-column justify-content-between'>
            {editingTask ? (
            <>
            <input
                className='form-control my-1'
                type="text"
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            />
            <input
                className='form-control my-1'
                type="text"
                value={updatedTask.description}
                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            />
            <input
                className='form-control my-1'
                type="date"
                value={updatedTask.deadline}
                onChange={handleDeadlineChange}
            />
            <button onClick={handleSaveTask} className='btn btn-success'>Save</button>
            </>
        ) : (
            <>
            <div>
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
            </div>
            <div>
                <p>Deadline: {task.deadline}</p>
                <select value={completed} onChange={handleStatusChange} className='form-select'>
                    <option value={false}>In Progress</option>
                    <option value={true}>Complete</option>
                </select>
                <div className='row m-1 d-flex justify-content-end'>
                    <button onClick={() => setEditingTask(true)} className='col-2 mx-1 btn btn-outline-info'>&#9998;</button>
                    <button onClick={handleDeleteTask} className='col-2 btn btn-outline-danger'>&#10005;</button>
                </div>
            </div>
            
            </>
        )}
        </div>
    </div>
  );
};

export default Task;