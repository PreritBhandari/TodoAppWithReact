import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { TodayIcon, DeleteIcon } from "@material-ui/icons";

export default function ListTodo() {
  const [allTodos, setAllToDos] = useState([]);
  const getData = async () => {
    const dataReceived = await firebase.firestore().collection("todo").get();
    return dataReceived.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setAllToDos(data);
    });
  }, [allTodos]);
  return (
    <div>
      <div className="todo">
        <Grid container spacing={3}>
          <List>
            {allTodos.map((todo) => (
              <Grid item xs={12}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <TodayIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={todo.todo} secondary={todo.date} />
                  <Avatar>
                    <DeleteIcon />
                  </Avatar>
                </ListItem>
              </Grid>
            ))}
          </List>
        </Grid>
      </div>
    </div>
  );
}
