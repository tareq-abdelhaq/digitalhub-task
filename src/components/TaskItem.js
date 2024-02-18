function TaskItem(props) {
  const { id, description, status } = props;

  return (
    <article>
      <p>{description}</p>
      <span>{status}</span>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </article>
  );
}

export default TaskItem;
