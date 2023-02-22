import React, { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material/";
import Alert from "@mui/material/Alert";
import { Flex } from "./components/styles/Flex.styled";
import { GenreStyled, Card } from "./components/styles/Genre.style";

export default function AddGenre() {
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]);
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    // get list of genre in data base
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
  }, []);
  function handleChange(e) {
    const target = e.target;
    setName(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_MODE
            : process.env.REACT_APP_PRO_MODE
        }/genre/create`,
        {
          name: name.toUpperCase(),
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
        if (res.data.genre) setGenres(res.data.genre);
      });
  }
  function handleDelete(e) {
    const target = e.currentTarget.parentElement.parentElement;
    const id = target.getAttribute("data-id");
    axios
      .delete(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_MODE
            : process.env.REACT_APP_PRO_MODE
        }/genre/${id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>;
        console.log(res.data.posts);
        if (res.data.genre) setGenres(res.data.genre);
      });
  }
  function handleEdit(e) {
    const target = e.currentTarget.parentElement.parentElement;
    const text = target.children[0].textContent;
    const id = target.getAttribute("data-id");
    axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_MODE
            : process.env.REACT_APP_PRO_MODE
        }/genre/${id}/update`,
        {
          name: text.toUpperCase(),
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
        if (res.data.genre) setGenres(res.data.genre);
      });
  }
  return (
    <GenreStyled>
      <Flex smDir="column" lgDir="row">
        <Card>
          {genres.map((genre, index) => {
            return (
              <div data-id={genre._id} key={index}>
                <h3 contentEditable>{genre.name}</h3>
                <div>
                  <button onClick={handleDelete} type="submit">
                    Delete
                  </button>
                  <button onClick={handleEdit} type="submit">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              required
              id="name"
              value={name}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </Flex>
    </GenreStyled>
  );
}
