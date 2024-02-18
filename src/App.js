import { useState } from "react";

import TasksFilterForm from "./components/TasksFilterForm";
import TasksGrid from "./components/TasksGrid";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <TasksFilterForm />

      <div>
        <button>Add</button>
      </div>

      <main>
        <TasksGrid tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
