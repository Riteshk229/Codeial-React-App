import { useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import "../assets/App.css";
import { getPosts } from "../api";
import { Home, Login} from "../pages";
import {Loader, Navbar} from "./";

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
    <div className="App">
      <Navbar />
        <Routes>
        <Route exact path="/" element={<Home posts={posts} />}></Route>
        <Route exact  path="/login" element={<Login/>}></Route>
          {/* <Route  exact path="/about" element={About}></Route> */}
          {/* <Route exact path="/user/:user_ID" element={UserInfo}></Route> */}
        </Routes>
    </div>
  );
}

export default App;
