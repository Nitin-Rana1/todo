import styles from "./styles/ToDoApp.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function TaskModal({
  open,
  handleClickOpen,
  handleClose,
  addTask,
  task,
  setTask,
}: {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  task: string;
  addTask: () => void;
  setTask: (arg0: string) => void;
}) {
  return (
    <main className={styles.taskModal}>
      <section></section>
      <Button
        sx={{ marginBottom: "2vh" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add a todo
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>ADD A TASK</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: "1vh" }}
            id="outlined-basic"
            label="Task"
            variant="outlined"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              addTask();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
