import React from "react";
import { Link } from "react-router-dom";
export default function Nav({ posts }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={"/"}>Blog Post</Link>
        {posts.length ? (
         <Link to={"/log-out"}>Log Out</Link>
        ) : (
          <Link to={"/sign-up"}>Sign up</Link>
        )}
        <Link to={"/log-in"}>Login</Link>
      </div>
    </div>
  );
}
