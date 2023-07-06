import Task from "./Task";

const CompleteTasks = ({ tasks }) => {
    const completeTasks = tasks.filter(task => task.completed === true);
    return (
        <>
        <h2>Complete Tasks</h2>
        <div className="row">
            {completeTasks.map(task => (
            <Task key={task.id} task={task} />
            ))}
        </div>
      </>
    );
  };

export default CompleteTasks