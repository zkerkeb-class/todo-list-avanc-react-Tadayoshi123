import Image from "next/image";
import styles from "./page.module.css";
import TodoList from "./todolist/page";
import { TasksProvider } from "@/context/taskContext";

export default function Home() {
  return (
    <TasksProvider>
      <div className={styles.page}>
        <main className={styles.main}>
          <TodoList />
        </main>
      </div>
    </TasksProvider>
  );
}
