import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { TASK_STATUS } from "../../constants/task";

import classes from "./TasksFilterForm.module.css";

function TasksFilterForm() {
  const [form, setForm] = useState({
    desc: "",
    status: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  function fieldChangedHandler(e) {
    const {
      target: { name, value },
    } = e;
    setForm((currFormData) => ({ ...currFormData, [name]: value }));
  }

  function resetFormData() {
    setForm({
      desc: "",
      status: "",
    });
  }

  function submitHandler(e) {
    e.preventDefault();

    if (form.desc.trim() !== "") {
      searchParams.set("desc", form.desc);
    } else {
      searchParams.delete("desc");
    }
    if (form.status) {
      searchParams.set("status", form.status);
    } else {
      searchParams.delete("status");
    }

    setSearchParams(searchParams);
  }

  function resetHandler() {
    resetFormData();
    setSearchParams({});
  }

  useEffect(() => {
    setForm({
      desc: searchParams.get("desc") || "",
      status: searchParams.get("status") || "",
    });
    //eslint-disable-next-line
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["input-control"]}>
        <label htmlFor="desc">Description</label>
        <input
          id="desc"
          type="text"
          name="desc"
          value={form.desc}
          onChange={fieldChangedHandler}
        />
      </div>

      <div className={classes["input-control"]}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={fieldChangedHandler}
        >
          <option value="" />
          {Object.entries(TASK_STATUS).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={classes["form-actions"]}>
        <button>Filter</button>
        <button type="button" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default TasksFilterForm;
