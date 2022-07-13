import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { store } from "./app/store";
import { CssBaseline } from "@mui/material";
// import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
