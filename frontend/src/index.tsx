import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import LoadContextProvider from "./LoadContext";

ReactDOM.render(
  <LoadContextProvider>
    <App />
  </LoadContextProvider>,
  document.getElementById("root")
);
