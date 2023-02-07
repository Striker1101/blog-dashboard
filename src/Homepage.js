import React from "react";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";
import { fetchGet_ID_toggle } from "./post";
export default function Index({ setIndex, posts, setPosts }) {
  function toggle(e) {
    const card = e.currentTarget.parentElement.parentElement;
    const take = card.children[2].children[0].textContent;
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
    <div>
      <div
      >
        {posts.length ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
          }} >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {posts.map((post, i) => {
                return (
                  <Card
                    setPosts={setPosts}
                    setIndex={setIndex}
                    key={i}
                    index={i}
                    post={post}
                    toggle={toggle}
                  />
                );
              })}
              <Link to={"/add-post"}>
                <button>Add Post</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
