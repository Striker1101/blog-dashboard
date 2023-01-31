import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import { fetchGetAuth, fetchGet_ID_toggle } from "./post";
export default function Index({setIndex}) {
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

  function toggle(e) {
    const card = e.currentTarget.parentElement.parentElement;
    const take = card.children[1].children[0].textContent;
    const id = card.getAttribute("data-id");
    let toggle = null;
    if (take === "PUBLISHED") {
      toggle = false;
    } else {
      toggle = true;
    }
    fetchGet_ID_toggle(
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE,
      id,
      { toggle }
    ).then((data) => {
      setPosts(data.json.posts);
    });
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {posts.length ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {posts.map((post, i) => {
                return <Card setPosts={setPosts} setIndex={setIndex} key={i} index={i} post={post} toggle={toggle} />;
              })}
              <Link to={"/add-post"}>
                <button>Add Post</button>
              </Link>
            </div>
          </>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
}
