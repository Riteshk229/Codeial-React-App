import { useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import { getPosts } from "../api";
import { Home, Login} from "../pages";
import {Loader, Navbar} from "./";
import { useAuth, usePosts } from "../hooks";

function App() {
  const auth = useAuth();
  const posts = usePosts();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     console.log("Response ", response);

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);


  if (auth.loading) {
    return <Loader/>
  }

  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact  path="/login" element={<Login/>}></Route>
          {/* <Route  exact path="/about" element={About}></Route> */}
          {/* <Route exact path="/user/:user_ID" element={UserInfo}></Route> */}
        </Routes>
    </div>
  );
}

export default App;
