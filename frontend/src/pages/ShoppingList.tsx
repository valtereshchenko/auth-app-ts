import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";

export default function ShoppingList() {
  const myContext = useAuth();
  const authData = myContext?.authData;
  const navigate = useNavigate();
  const [listItems, setItem] = useState<any>([]); //the list of tasks
  const [task, setTask] = useState(""); //single task
  const onLogout = myContext?.onLogOut;

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    //gets all of the tasks related to one user
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }

  function logoutHandler() {
    fetch("/users/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (onLogout) onLogout(); // update the authData
        navigate("/login");
      })
      .catch((error) => console.log(error));
  }

  function submitHandler(e: any) {
    e.preventDefault();
    let exists = listItems.some((item: any) => item.task === task);
    if (!exists) {
      const formData = new FormData(e.target);
      formData.get("task"); //to catch the value from the input

      const requestOptions = {
        method: "POST",
        url: "/tasks",
        credentials: "include",
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
        },
        // body: JSON.stringify({ task: task }),
        data: formData,
      };
      axios(requestOptions).then((res) => {
        console.log(res, "RES");
        getTasks();
        setTask("");
      });
    } else {
      setTask("");
    }
  }

  function handleDelete(itemId: any) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: itemId }),
    };
    fetch("/tasks/remove", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getTasks();
      });
  }

  return !authData?.name ? (
    <h2>Welcome! Please login to continue</h2>
  ) : (
    <div className="list">
      {listItems.length === 0 ? (
        <h2>You have no items yet</h2>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          {authData.name && `${authData.name}'s`} shopping list
        </h1>
      )}
      <form onSubmit={submitHandler}>
        <label>
          Need to buy:
          <input
            type="text"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></input>
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {listItems.map((item: any, index: number) => (
          <li key={item._id}>
            <span>{item.task}</span>
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                background: "red",
                border: "none",
                padding: "3px",
                borderRadius: "3px",
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <Button type="submit" onClick={logoutHandler} variant="contained">
        Log Out
      </Button>
    </div>
  );
}
