import React from 'react';

function Modal({ newTask, setNewTask, handleAddTask }) {

  const handleAddTaskClick = () => {
    if (newTask.title.trim() === '') {
      alert('Please enter a title for the task.');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (newTask.deadline < today) {
      alert('Please select a future date for the task deadline.');
      return;
    }

    handleAddTask(newTask);
    setNewTask({ title: '', description: '', deadline: '' });
  };

  return (
      <div className='my_modal_content bg-dark p-4 rounded' onClick={e => e.stopPropagation()}>
        <h3 className='text-white text-center'>New Task</h3>
        <input
          className='form-control my-2'
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className='form-control my-2'
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />
        <input
          className='form-control my-2'
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          placeholder="Deadline"
        />
        <button onClick={handleAddTaskClick} className='btn btn-primary w-100'>Add Task</button>
      </div>
  );
}

export default Modal;