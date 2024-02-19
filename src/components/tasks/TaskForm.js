import { useEffect, useState } from "react";

import { TASK_STATUS } from "../../constants/task";

import classes from "./TaskForm.module.css";

function TaskForm(props) {
  const { onOk, onCancel, initData } = props;

  const [form, setForm] = useState({
    description: "",
    status: TASK_STATUS.NOT_STARTED,
  });

  function fieldChangedHandler(e) {
    const {
      target: { name, value },
    } = e;
    setForm((currState) => ({ ...currState, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const data = { ...form };
    if (!initData) {
      data.id = new Date().toString();
    }
    onOk(data);
  }

  useEffect(() => {
    if (initData) {
      setForm(initData);
    }
  }, [initData]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["input-control"]}>
        <label htmlFor="task-desc">Description</label>
        <input
          id="task-desc"
          type="text"
          name="description"
          value={form.description}
          onChange={fieldChangedHandler}
          required
        />
      </div>

      <div className={classes["input-control"]}>
        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          name="status"
          value={form.status}
          onChange={fieldChangedHandler}
        >
          {Object.entries(TASK_STATUS).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={classes["form-actions"]}>
        <button>Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
