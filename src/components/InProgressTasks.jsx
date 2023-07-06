import Task from "./Task";

const InProgressTasks = ({ tasks }) => {
    const inProgressTasks = tasks.filter(task => task.completed === false);
  
    return (
        <>
        <h2>In Progress Tasks</h2>
        <div className="row">
            {inProgressTasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
      </>
    );
  };

export default InProgressTasks