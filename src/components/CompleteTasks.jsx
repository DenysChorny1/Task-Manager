import Task from "./Task";

const CompleteTasks = ({ tasks }) => {
    const completedTasks = tasks.filter(task => task.completed === true);
    return (
        <>
        <h2>Completed Tasks</h2>
        <div className="row">
            {completedTasks.map(task => (
            <Task key={task.id} task={task} />
            ))}
        </div>
      </>
    );
  };

export default CompleteTasks