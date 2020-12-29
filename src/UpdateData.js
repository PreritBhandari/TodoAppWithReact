import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import firebase from "firebase";
import moment from "moment";

export default function UpdateData(props) {
  const [value, setValue] = useState();

  const updateTodoFirebase = (id) => {
    firebase
      .firestore()
      .collection("todo")
      .doc(id)
      .update({
        todo: value,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.reload();
      });
  };

  const updatedData = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={props.isModalOpen}
        onClose={props.modalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.todo}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={props.id}
            label="Updated Todo"
            type="text"
            fullWidth
            value={value}
            onChange={updatedData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.modalClose} color="primary">
            Close
          </Button>
          <Button onClick={() => updateTodoFirebase(props.id)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
