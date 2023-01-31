
import "./App.css";
import BlogPage from "./blog_page";
import { Routes, Route } from "react-router-dom";
import Index from "./Homepage";
import Nav from "./components/Nav";
import Signup from "./signup";
import Login from "./login";
import AddPost from "./AddPost";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="blog">
      <Nav />
      <Routes>
        <Route index path="/" element={<Index />} />
        <Route path="/:post" element={<BlogPage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
