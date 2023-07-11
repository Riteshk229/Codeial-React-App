import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import "./assets/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications"; 
import { AuthProvider, PostProvider } from "./provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    {/* Wrapping the component where our context is being used  */}
    <AuthProvider>
      <PostProvider>
          <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
            <App /> 
          </ToastProvider>
      </PostProvider>
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
