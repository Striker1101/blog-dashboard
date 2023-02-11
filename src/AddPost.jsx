import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postAuth from "./post";
import Textarea from "./components/Textarea";
import axios from "axios";
import { update } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
export default function AddPost({ index, setIndex }) {
  const form = useRef();
  const dispatch = useDispatch();
  const collector = useSelector((state) => state.posts);
  const posts = collector.posts;
  const [post, setPost] = useState(undefined);
  const [Form, setForm] = useState({
    title: "",
    summary: "",
    publish: "",
    image: "",
  });

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
    const token = localStorage.getItem("token");

    /**
     *
     * @param {string} id
     * repre the posts ID to be uploaded with an image if available
     * @param {Array} res
     * repre the received posts for update the home page
     * @returns returns empthy string when sucessful and error message when there is an error
     */
    const uploadFile = async function (id, res) {
      //build new FormData and appened  image and cloudinary upload preset
      const data = new FormData();
      data.append("file", Form.image);
      data.append("upload_preset", "blog_post");

      //return empty on no image found
      if (Form.image.length < 0) {
        if (res !== undefined) {
          dispatch(update(res.posts));
        }
        console.log("onimage");
        navigate("/");
        return;
      }
      await axios
        .post("https://api.cloudinary.com/v1_1/durfrwtjs/image/upload", data)
        .then((res) => {
          axios
            .put(
              `${
                process.env.NODE_ENV === "development"
                  ? process.env.REACT_APP_DEV_MODE
                  : process.env.REACT_APP_PRO_MODE
              }/posts/${id}/update_image`,
              { imageUrl: res.data.secure_url, publicId: res.data.public_id },
              {
                headers: {
                  "Content-Type": "application/json",
                  // "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              dispatch(update(response.data.posts));
              console.log("image");
              navigate("/");
            });
        });
    };
    // update post
    if (post) {
      return (() => {
        axios
          .put(
            `${
              process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_DEV_MODE
                : process.env.REACT_APP_PRO_MODE
            }/posts/${post._id}/update`,
            {
              title: Form.title === "" ? post.title : Form.title,
              summary: Form.summary === "" ? post.summary : Form.summary,
              publish: Form.publish === "" ? post.publish : Form.publish,
              content: content === "" ? post.content : content,
            },
            {
              headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            uploadFile(post._id, res.data);
          });
      })();
    }

    //add post
    console.log(Form);
    postAuth(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE
      }/posts`,
      {
        title: Form.title,
        summary: Form.summary,
        publish: Form.publish,
        content,
      }
    ).then((data) => {
      form.current.reset();
      setIndex(null);
      uploadFile(data.json.id, data.json);
    });
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
        method="post"
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
