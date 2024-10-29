"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import useSWR from "swr";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: string) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  loading: boolean;
  error: any;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TasksProvider({ children }: { children: ReactNode }) {
  const { data: initialTasks, error } = useSWR<Task[]>(
    "https://my-json-server.typicode.com/Tadayoshi123/taskAPI/tasks",
    fetcher,
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((task: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: task, completed: false },
    ]);
  }, []);

  const deleteTask = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskCompletion = useCallback((taskId: number) => {
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
        loading: !initialTasks && !error,
        error,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}