import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postAuth from "./post";
import Textarea from "./components/Textarea";
import axios from "axios";
import { AddPost_Styled, FormStyled } from "./components/styles/AddPost.styled";
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
    publish: false,
    image: "",
  });

  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  function handlePhoto(e) {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  }
  function handleForm(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function add_update(content) {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("file", Form.image);
    data.append("upload_preset", "blog_post");

    const genre = [];

    for (let i = 0; i < genres.length; i++) {
      const name = genres[i].name;
      if (document.getElementById(`${name}`).checked) {
        genre.push(document.getElementById(`${name}`).value);
      }
    }

    function upload(url = post.secure_url, publicID = post.public_id) {
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
            genre,
            content: content === "" ? post.content : content,
            imageUrl: url,
            publicId: publicID,
            newImage,
            oldPic: post.publicId,
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
          form.current.reset();
          setIndex(null);
          dispatch(update(res.data.posts));
          navigate("/")
        });
    }

    // update post
    if (post) {
      // when there is a new image to upload

      var newImage = false;
      if (Form.image && post.imageUrl !== "") {
        newImage = true;
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            data
          )
          .then((res) => {
            console.log("in");
            upload(res.data.secure_url, res.data.public_id);
          });
        return;
      }
      return (() => {
        upload();
      })();
    }

    //add post
    if (Form.image) {
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          data
        )
        .then((res) => {
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
              genre,
              content,
              imageUrl: res.data.secure_url,
              publicId: res.data.public_id,
            }
          ).then((data) => {
            form.current.reset();
            navigate("/");
            dispatch(update(data.json.posts));
            //data.json.errors  [].msg
          });
        });
    } else {
      console.log("fill in image");
    }
  }

  function cleanup() {
    setIndex(null);
  }

  useEffect(() => {
    setPost(posts[index]);
    axios
      .get(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_MODE
            : process.env.REACT_APP_PRO_MODE
        }/genre`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setGenres(res.data.genre);
      });
    return cleanup();
  }, []);

  return (
    <AddPost_Styled>
      <FormStyled
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        method="post"
        ref={form}
      >
        <label htmlFor="image">
          CONTENT IMAGE
          <input
            onChange={handlePhoto}
            accept="image/*"
            type="file"
            name="image"
            id="image"
            required
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
            onChange={handleForm}
            id="publish"
            defaultChecked={post ? post.publish : Form.publish}
          />
        </label>
        <label htmlFor="genre_group">
          {genres.map((genre, i) => {
            if (post) {
              var check = post.genre.includes(genre._id);
            }
            return (
              <label key={i} htmlFor="genre">
                {genre.name}
                <input
                  type="checkbox"
                  name="genre"
                  id={genre.name}
                  value={genre._id}
                  defaultChecked={post ? check : false}
                />
              </label>
            );
          })}
        </label>
        <Textarea submit={add_update} post={post} />
      </FormStyled>
    </AddPost_Styled>
  );
}
