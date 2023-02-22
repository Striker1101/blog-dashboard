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
import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/reducer/posts";
import { ThemeProvider } from "styled-components";
import theme from "./Theme";
function App() {
  const [index, setindex] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Container>
              <Index setIndex={setindex} />
            </Container>
          }
        />
        <Route
          path="/:post"
          element={
            <Container>
              <BlogPage />
            </Container>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Container>
              <Signup />
            </Container>
          }
        />
        <Route
          path="/log-in"
          element={
            <Container>
              <Login />
            </Container>
          }
        />
        <Route
          path="/log-out"
          element={
            <Container>
              <Logout />
            </Container>
          }
        />
        <Route
          path="/add-post"
          element={
            <Container>
              <AddPost index={index} setIndex={setindex} />
            </Container>
          }
        />
        <Route
          path="/add-genre"
          element={
            <Container>
              <AddGenre />
            </Container>
          }
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
