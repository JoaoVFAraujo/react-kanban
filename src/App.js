import "./styles.css";

import Navbar from "./components/navbar/Navbar";
import TaskList from "./components/taskList/TaskList";
import { useState } from "react";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };

    setTasks(() => [...tasks, newTask]);
  };

  const updateTask = (id, title, state) => {
    setTasks(() => {
      return tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks(() => {
      return tasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          taskState="pendente"
          onAddTask={addTask}
          tasks={tasks.filter((task) => task.state === "pendente")}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
        />
        <TaskList
          title="Fazendo"
          taskState="fazendo"
          onAddTask={addTask}
          tasks={tasks.filter((task) => task.state === "fazendo")}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
        />
        <TaskList
          title="completo"
          onAddTask={addTask}
          taskState="completo"
          tasks={tasks.filter((task) => task.state === "completo")}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
        />
      </div>
    </div>
  );
}
