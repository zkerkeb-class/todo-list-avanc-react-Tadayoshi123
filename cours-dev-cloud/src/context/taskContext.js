"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useFetch } from "@/hooks/useFetch";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const {
    data: initialTasks,
    loading,
    error,
  } = useFetch("https://my-json-server.typicode.com/Tadayoshi123/taskAPI/tasks");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: task, completed: false },
    ]);
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        loading,
        error,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}