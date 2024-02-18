import TaskItem from "./TaskItem";

function TasksGrid(props) {
  const { tasks } = props;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem {...task} />
        </li>
      ))}
    </ul>
  );
}

export default TasksGrid;
