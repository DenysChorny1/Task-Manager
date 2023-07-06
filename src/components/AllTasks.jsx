import Task from "./Task";

const AllTasks = ({ tasks }) => {
    return (
        <>
        <h2>All Tasks</h2>
        <div className="row">
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
      </>
    );
  };

export default AllTasks