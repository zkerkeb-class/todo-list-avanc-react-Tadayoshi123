import React from "react";
import styles from "./page.module.css";
import TodoList from "./todolist/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TodoList />
      </main>
    </div>
  );
}