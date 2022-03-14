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

    firestore
      .collection("todo")
      .add({
        todo: value,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
      .then(() => {
        console.log("Todo Added");
        window.location.reload();
      });
  };

  const textChange = (event) => {
    setValue(event.target.value);
  };

  // firebase Configuration for todoapp
  const firebaseConfig = {

    apiKey: "AIzaSyBDY4GOW914CXpWYTZ6LCt23iXrM7c08yU",

    authDomain: "todoappnew-7cdbc.firebaseapp.com",

    projectId: "todoappnew-7cdbc",

    storageBucket: "todoappnew-7cdbc.appspot.com",

    messagingSenderId: "691957675268",

    appId: "1:691957675268:web:231a53c42dde16383a8c51",

    measurementId: "G-T0JJRWF1PQ"

  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <div className="todoApp">
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

        {value ?
          <Button
            style={{ marginTop: 5 }}
            onClick={addTodo}
            variant="contained"
            color="primary"
            size="medium"
          >
            Add Todo
          </Button> : null}
      </form>
      <br />
      <ListTodo />
    </div>
  );
}
