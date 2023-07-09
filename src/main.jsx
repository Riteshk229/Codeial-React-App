import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import "./assets/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications"; 
import { AuthProvider } from "./provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <Router>
      <AuthProvider>
       <App /> 
      </AuthProvider>
    </Router>
  </ToastProvider>
  // </React.StrictMode>
);
