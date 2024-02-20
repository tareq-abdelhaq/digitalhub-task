import { TASK_STATUS } from "../../constants/task";

import classes from "./TaskItem.module.css";

function TaskItem(props) {
  const { id, description, status, onDelete, onEdit } = props;

  function getStatusKeyByValue(value) {
    return Object.keys(TASK_STATUS).find((key) => TASK_STATUS[key] === value);
  }

  return (
    <article className={classes.task}>
      <p>{description}</p>
      <span
        className={`${classes.status} ${classes[getStatusKeyByValue(status)]}`}
      >
        {status}
      </span>
      <div className={classes.actions}>
        <button type="primary" onClick={onEdit.bind(null, id)}>
          Edit
        </button>
        <button type="danger" onClick={onDelete.bind(null, id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
