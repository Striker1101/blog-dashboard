import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postAuth from "./post";
import Textarea from "./components/Textarea";

export default function AddPost({ posts, index, setIndex }) {
  const form = useRef();
  const [post, setPost] = useState(undefined);
  const [Form, setForm] = useState({
    title: "",
    summary: "",
    publish: "",
    image: "",
  });
  const formData = new FormData();
  const navigate = useNavigate();

  function handlePhoto(e) {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  }
  function handleForm(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handlePublish(e) {
    setForm((prev) => ({
      ...prev,
      publish: e.target.checked,
    }));
  }

  function add_update(content) {
    if (post) {
      var date = post.date;
    }
    const blob = new Blob([content], { type: "text/xml"});

    formData.append("image", Form.image);
    formData.append("title", Form.title);
    formData.append("summary", Form.summary);
    formData.append("publish", Form.publish);
    formData.append("content", blob);
    formData.append("date", post ? date : "");

    for (const key of formData.keys()) {
      console.log(key);
    }

    postAuth(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE
      }/posts`,
      formData
    ).then((data) => {
      console.log(data);
      form.current.reset();
      setIndex(null);
      navigate("/");
    });
    // ${post ? post._id : ""}
  }

  function cleanup() {
    setIndex(null);
  }

  useEffect(() => {
    setPost(posts[index]);
    return cleanup();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "wheat",
        borderRadius: "20px",
        paddingTop: "10px",
      }}
    >
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        method='post'
        ref={form}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <label htmlFor="image">
          CONTENT IMAGE
          <input
            onChange={handlePhoto}
            accept="image/*"
            type="file"
            name="image"
            id="image"
          />
        </label>
        <label htmlFor="title">
          TITLE:
          <input
            required
            type="text"
            name="title"
            onChange={handleForm}
            id="title"
            title="Importance of inheritance"
            defaultValue={post ? post.title : ""}
          />
        </label>
        <br />
        <label htmlFor="summary">
          SUMMARY:
          <textarea
            required
            name="summary"
            onChange={handleForm}
            id="summary"
            cols="30"
            rows="10"
            defaultValue={post ? post.summary : ""}
          ></textarea>
        </label>
        <br />
        <label htmlFor="publish">
          DO YOU WISH TO PUBLISH:
          <input
            type="checkbox"
            name="publish"
            onChange={handlePublish}
            id="publish"
            defaultChecked={post ? post.publish : false}
          />
        </label>
        <Textarea submit={add_update} post={post} />
      </form>
    </div>
  );
}
