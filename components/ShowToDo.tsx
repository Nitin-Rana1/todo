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

export default function AddToDo({
  taskList,
  searchTerm,
  deleteTask,
}: {
  taskList: Task[];
  searchTerm: string;
  deleteTask: (i: string) => void;
}) {
  return (
    <main className={styles.showToDo}>
      <List>
        {taskList
          .filter((task) => {
            return task.value.includes(searchTerm);
          })
          .map((task, i) => {
            return (
              <ListItem
                key={task.id}
                sx={{ bgcolor: grey[200], marginBottom: "1vh" }}
              >
                <ListItemText primary={task.value} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <DeleteIcon sx={{ color: blue[600] }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </main>
  );
}
