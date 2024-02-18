import { TASK_STATUS } from "../constants/task";

function TasksFilterForm() {
  return (
    <form>
      <div>
        <label htmlFor="desc">Description</label>
        <input id="desc" type="text" name="desc" />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status">
          {Object.entries(TASK_STATUS).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="button">Reset</button>
        <button>Filter</button>
      </div>
    </form>
  );
}

export default TasksFilterForm;
