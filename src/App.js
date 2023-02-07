
import "./App.css";
import BlogPage from "./blog_page";
import { Routes, Route } from "react-router-dom";
import Index from "./Homepage";
import Nav from "./components/Nav";
import Signup from "./signup";
import Login from "./login";
import AddPost from "./AddPost";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import { fetchGetAuth } from "./post";

function App() {
  const [index, setindex] =useState(null)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchGetAuth(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE
      }/all`
    ).then((data) => setPosts(data.json.posts));
  }, []);
  return (
    <div className="blog">
      <Nav posts={posts} />
      <Routes>
        <Route index path="/" element={<Index setIndex={setindex}  setPosts={setPosts} posts={posts}/>} />
        <Route path="/:post" element={<BlogPage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/add-post" element={<AddPost index={index} setIndex={setindex} posts={posts} setPosts={setPosts} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
