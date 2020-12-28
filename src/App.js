import React, { useState } from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import moment from "moment";
import firebase from "firebase";
import ListTodo from "./ListTodo";

export default function App() {
  const [value, setValue] = useState();
  // const [time, setTime] = useState("");
  // const [todoValue, setTodoValue] = useState("");

  const addTodo = (event) => {
    event.preventDefault();

    // setTodoValue(value);
    // setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    // for firebase

    const firestore = firebase.firestore();

    firestore.collection("todo").add({
      todo: value,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  };

  const textChange = (event) => {
    setValue(event.target.value);
  };

  // firebase Configuration for todoapp
  var firebaseConfig = {
    apiKey: "AIzaSyAtiS7prQzYl2fr_KNlvzLl-FZPTyUTNCE",
    authDomain: "todoapp-react-63b26.firebaseapp.com",
    projectId: "todoapp-react-63b26",
    storageBucket: "todoapp-react-63b26.appspot.com",
    messagingSenderId: "624975785412",
    appId: "1:624975785412:web:45a8a0f18e6f9a54d78891",
    measurementId: "G-BFCHJCLKNQ",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <div className="todoApp">
      <h1> Todo App</h1>

      <form>
        <TextField
          id="filled-size-small"
          value={value}
          placeholder="Add a Todo"
          variant="filled"
          size="small"
          onChange={textChange}
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          onClick={addTodo}
          variant="contained"
          color="primary"
          size="medium"
        >
          Add
        </Button>
      </form>
      <br />
      <ListTodo />
    </div>
  );
}
