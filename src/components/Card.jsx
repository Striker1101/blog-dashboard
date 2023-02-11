import React from "react";
import edit from "../assets/edit.svg";
import deltepost from "../assets/delete.svg";
import { Link } from "react-router-dom";
import { Card_Content } from "./styles/Card.styled";
import { Button } from "../components/styles/Button.styled";
import { useNavigate } from "react-router-dom";
import { fetchGet_ID_delete } from "../post";
import { useDispatch } from "react-redux";
import { update } from "../redux/action";
export default function Card({ post, index, setIndex, toggle }) {
  const dispatch = useDispatch();
  const date = new Date(post.date);
  const navigate = useNavigate();

  // edit on click
  function editClick(e) {
    let card = e.currentTarget.parentElement.parentElement;
    const index = card.getAttribute("data-index");
    setIndex(index);
    navigate("/add-post");
  }

  function deleteClick(e) {
    const card = e.currentTarget.parentElement.parentElement;
    const id = card.getAttribute("data-id");
    const name = card.children[1].children[0].textContent;
    const choice = prompt(
      `Are you sure you want to delete, this is permanent, type (${name}) to continous `
    );
    if (choice === name) {
      //delete
      fetchGet_ID_delete(
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE,
        id
      ).then((data) => dispatch(update(data.json.posts)));
    }
  }
  return (
    <Card_Content data-index={index} data-id={post._id}>
      <div>
        <img
          onClick={(e) => {
            deleteClick(e);
          }}
          src={deltepost}
          alt=""
        />
        <img
          onClick={(e) => {
            editClick(e);
          }}
          src={edit}
          alt=""
        />
      </div>
      <Link to={`/${post._id}`}>
        <h2>{post.title}</h2>
        <hr />
      </Link>
      <div>
        <p>{post.publish ? "PUBLISHED" : "UNPUBLISHED"}</p>
        <Button
          onClick={(e) => {
            toggle(e);
          }}
        >
          {post.publish ? "unpublish" : "publish"}
        </Button>
      </div>
      <div>
        <h5>uploaded on {date.toDateString()}</h5>
      </div>
    </Card_Content>
  );
}
