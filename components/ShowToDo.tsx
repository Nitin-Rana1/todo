import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
} from "@mui/material";
import styles from "./styles/ToDoApp.module.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { blue, grey } from "@mui/material/colors";

export default function AddToDo({
  taskList,
  searchTerm,
  deleteTask,
  doneTask,
}: {
  taskList: Task[];
  searchTerm: string;
  deleteTask: (i: string) => void;
  doneTask: (i: string) => void;
}) {
  return (
    <main className={styles.showToDo}>
      <List>
        {taskList.map((task, i) => {
          return (
            <ListItem
              key={task.id}
              sx={{
                bgcolor: "#4c4c4c",
                color: "white",
                borderRadius: "2px",
                marginBottom: "1vh",
              }}
            >
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
                sx={{ paddingRight: "2vw" }}
              >
                <DeleteIcon sx={{ color: blue[600] }} />
              </IconButton>
              <ListItemText
                primary={task.value}
                sx={{ paddingRight: "30vw" }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => doneTask(task.id)}
                >
                  <DoneOutlineIcon sx={{ color: blue[600] }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </main>
  );
}
