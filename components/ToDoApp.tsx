import { useEffect, useState } from "react";
import styles from "./styles/ToDoApp.module.scss";
import { Button, LinearProgress, Slide, TextField } from "@mui/material";
import ShowToDo from "./ShowToDo";
import { randomUUID } from "crypto";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import TaskModal from "./TaskModal";
import ShowCompletedToDo from "./ShowCompletedToDo";

export default function ToDoApp() {
  const [task, setTask] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [scoreList, setScoreList] = useState<number[]>([]);
  const [totalScoreList, setTotalScoreList] = useState<number[]>([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem("storedTasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
    const completedTasks = localStorage.getItem("completedTasks");
    if (completedTasks) {
      setCompletedTaskList(JSON.parse(completedTasks));
    }
  }, []);

  function addTask() {
    if (task === "") {
      return;
    }
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
  function restart() {
    let compTasks = localStorage.getItem("completedTasks");
    let dailyTasks = localStorage.getItem("storedTasks");
    let compTasksArr = compTasks ? JSON.parse(compTasks) : [];
    let dailyTasksArr = dailyTasks ? JSON.parse(dailyTasks) : [];

    // add score to local storage
    let score = localStorage.getItem("score");
    let scoreArr = score ? JSON.parse(score) : [];
    let totalScore = localStorage.getItem("totalScore");
    let totalScoreArr = totalScore ? JSON.parse(totalScore) : [];
    const tempTotal = dailyTasksArr.length + compTasksArr.length;
    const tempScore = compTasksArr.length;
    scoreArr.push(tempScore);
    totalScoreArr.push(tempTotal);
    localStorage.setItem("score", JSON.stringify(scoreArr));
    localStorage.setItem("totalScore", JSON.stringify(totalScoreArr));
    setScoreList([...scoreArr]);
    setTotalScoreList([...totalScoreArr]);

    localStorage.setItem("completedTasks", JSON.stringify([]));
    setCompletedTaskList([]);

    localStorage.setItem(
      "storedTasks",
      JSON.stringify([...compTasksArr, ...dailyTasksArr])
    );
    setTaskList([...compTasksArr, ...dailyTasksArr]);
  }
  function doneTask(i: string) {
    deleteTask(i);
    // adding completed task in completedTaskList
    localStorage.setItem(
      "completedTasks",
      JSON.stringify([
        ...completedTaskList,
        taskList.filter((task) => task.id === i)[0],
      ])
    );
    setCompletedTaskList([
      ...completedTaskList,
      taskList.filter((task) => task.id === i)[0],
    ]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main className={styles.toDoApp}>
      {/* <section className={styles.searchBar}>
        <TextField
          className={styles.searchField}
          label="Search ToDo"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </section> */}
      <section className={styles.addBar}>
        <TextField
          className={styles.addField}
          label="Add ToDo"
          variant="outlined"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          sx={{
            input: {
              color: "white",
            },
          }}
          InputLabelProps={{
            style: { color: "#1976d2" },
          }}
          autoFocus
        />
        <Button variant="contained" onClick={() => addTask()}>
          ADD
        </Button>
        <Button
          variant="outlined"
          onClick={() => restart()}
          sx={{ position: "absolute", right: "0" }}
        >
          Restart
        </Button>
      </section>

      <br />
      {/* <TaskModal
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        addTask={addTask}
        task={task}
        setTask={setTask}
      /> */}
      <section className={styles.taskHolder}>
        <ShowToDo
          taskList={taskList}
          deleteTask={deleteTask}
          searchTerm={searchTerm}
          doneTask={doneTask}
        />
        <ShowCompletedToDo taskList={completedTaskList} />
      </section>
      <article
        style={{
          display: "flex",
          justifyContent: "space-around",
          overflowY: "scroll",
          height: "20vh",
          scrollbarWidth: "none",
        }}
      >
        {scoreList.map((score, i) => {
          return (
            <div key={score.toString() + i.toString()}>
              <h4>Day {i + 1}:</h4>
              <LinearProgress
                variant="determinate"
                value={(score / totalScoreList[i]) * 100}
                sx={{ height: "1.5rem", width: "10rem" }}
              />
            </div>
          );
        })}
      </article>
    </main>
  );
}
