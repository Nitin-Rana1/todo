import { useEffect, useState } from "react";
import styles from "./styles/ToDoApp.module.scss";
import { Slide, TextField } from "@mui/material";
import ShowToDo from "./ShowToDo";
import { randomUUID } from "crypto";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import TaskModal from "./TaskModal";

export default function ToDoApp() {
  const [task, setTask] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("storedTasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  function addTask() {
    const id = self.crypto.randomUUID();
    localStorage.setItem(
      "storedTasks",
      JSON.stringify([...taskList, { id: id, value: task }])
    );
    setTaskList([...taskList, { id: id, value: task }]);
    setTask("");
    setSearchTerm("");
  }
  function deleteTask(i: string) {
    localStorage.setItem(
      "storedTasks",
      JSON.stringify(
        taskList.filter((task) => {
          return task.id != i;
        })
      )
    );

    setTaskList(
      taskList.filter((task) => {
        return task.id != i;
      })
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main className={styles.toDoApp}>
      <section className={styles.searchBar}>
        <TextField
          className={styles.searchField}
          label="Search Term"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </section>

      <br />
      <TaskModal
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        addTask={addTask}
        task={task}
        setTask={setTask}
      />
      <ShowToDo
        taskList={taskList}
        deleteTask={deleteTask}
        searchTerm={searchTerm}
      />
    </main>
  );
}
