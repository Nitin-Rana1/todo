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
import { blue, grey } from "@mui/material/colors";

export default function AddToDo({ taskList }: { taskList: Task[] }) {
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
                textDecoration: "line-through",
              }}
            >
              <ListItemText primary={task.value} />
              {/* <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon sx={{ color: blue[600] }} />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          );
        })}
      </List>
    </main>
  );
}
