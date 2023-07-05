import { useEffect, useState } from "react";
import "../assets/App.css";
import { getPosts } from "../api";
import { Home } from "../pages";

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log("Response ", response);
    };

    fetchPosts();
  }, []);
  return (
    <>
      <h1>Hello </h1>
      <Home />
    </>
  );
}

export default App;
