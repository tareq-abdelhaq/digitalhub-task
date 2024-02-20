import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import TasksFilterForm from "./components/tasks/TasksFilterForm";
import TasksGrid from "./components/tasks/TasksGrid";
import TaskForm from "./components/tasks/TaskForm";
import Modal from "./components/Modal";

import classes from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(sessionStorage.getItem("tasks")) || []
  );
  const [displayTasks, setDisplayTasks] = useState([]);
  const [taskModal, setTaskModal] = useState({ isOpen: false, initData: null });

  const [searchParams] = useSearchParams();

  function openTaskModal(taskId) {
    setTaskModal({
      isOpen: true,
      initData: taskId ? tasks.find((task) => task.id === taskId) : null,
    });
  }

  function closeTaskModal() {
    setTaskModal({ isOpen: false, initData: null });
  }

  function addTask(task) {
    setTasks((currTasks) => [task, ...currTasks]);
    closeTaskModal();
  }

  function editTask(task) {
    setTasks((currTasks) =>
      currTasks.map((currTask) => (currTask.id === task.id ? task : currTask))
    );
    closeTaskModal();
  }

  function deleteTask(taskId) {
    setTasks((currTasks) =>
      currTasks.filter((currTask) => currTask.id !== taskId)
    );
  }

  useEffect(() => {
    const desc = searchParams.get("desc");
    const status = searchParams.get("status");

    let filteredTasks = [...tasks];

    if (desc && desc.trim() !== "") {
      filteredTasks = filteredTasks.filter((task) =>
        task.description.includes(desc?.trim())
      );
    }
    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    setDisplayTasks(filteredTasks);
  }, [searchParams, tasks]);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={classes.app}>
      <TasksFilterForm />

      <div className={classes["add-task"]}>
        <button onClick={openTaskModal}>Add</button>
      </div>

      <main>
        <TasksGrid
          tasks={displayTasks}
          onDelete={deleteTask}
          onEdit={openTaskModal}
        />
      </main>

      {taskModal.isOpen && (
        <Modal onClose={closeTaskModal}>
          <TaskForm
            onOk={taskModal.initData ? editTask : addTask}
            onCancel={closeTaskModal}
            initData={taskModal.initData}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
