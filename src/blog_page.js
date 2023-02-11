import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostID from "./components/post";
import { CommentStyled_Container } from "./components/styles/Comment.styled";
import Comments from "./components/Comments";
import { fetchGet_ID_comments, fetchGet_ID_post } from "./post";
export default function Blog_page() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const postID = useParams().post;
  const take = postID;
  useEffect(() => {
    fetchGet_ID_post(
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE,
      take
    )
      .then((data) => setPost(data.json.post))
      .catch((err) => {
        console.log(err);
      });

    fetchGet_ID_comments(
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE,
      take
    )
      .then((data) => setComments(data.json.comments))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <CommentStyled_Container>
      {post._id ? (
        <>
          <PostID post={post} />
          {comments.length ? (
            <Comments
              setComments={setComments}
              postID={take}
              comments={comments}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        "loading"
      )}
    </CommentStyled_Container>
  );
}
