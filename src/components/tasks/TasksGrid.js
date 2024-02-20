import TaskItem from "./TaskItem";

import classes from "./TasksGrid.module.css";

function TasksGrid(props) {
  const { tasks, onDelete, onEdit } = props;

  if (tasks.length === 0) {
    return <h2 className="center">No tasks has been added yet!</h2>;
  }

  return (
    <ul className={classes.tasks}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem {...task} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
}

export default TasksGrid;
