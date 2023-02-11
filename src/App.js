import "./App.css";
import BlogPage from "./blog_page";
import { Routes, Route } from "react-router-dom";
import Index from "./Homepage";
import Nav from "./components/Nav";
import Signup from "./signup";
import Login from "./login";
import AddPost from "./AddPost";
import Footer from "./components/Footer";
import Logout from "./Logout";
import AddGenre from "./AddGenre";
import React, { useEffect, useState } from "react";
import { fetchGetAuth } from "./post";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/reducer/posts";
import { ThemeProvider } from "styled-components";
function App() {
  const [index, setindex] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="blog">
      <Nav  />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index path="/" element={<Index setIndex={setindex} />} />
          <Route path="/:post" element={<BlogPage />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/log-out" element={<Logout />} />
          <Route
            path="/add-post"
            element={<AddPost index={index} setIndex={setindex} />}
          />
          <Route path="/add-genre" element={<AddGenre />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
