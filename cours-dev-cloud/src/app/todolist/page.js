"use client";
import React, { useState, useMemo } from "react";
import { useTasks } from "@/context/taskContext";
import styles from "./page.module.css";

export default function TodoList() {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className={styles.todoList}>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div className={styles.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
