import { useEffect, useState } from "react";
import "../assets/App.css";
import { getPosts } from "../api";
import { Home } from "../pages";
import {Loader} from "./";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log("Response ", response);

      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);


  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <Home posts={posts} />
    </>
  );
}

export default App;
