import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./styles/Button.styled";
import { GenreStyled } from "./styles/Homepage.styled";
export default function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
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
  return (
    <GenreStyled>
      {genres.map((genre, index) => {
        return (
          <Button key={index} data-id={genre._id}>
            {genre.name}
          </Button>
        );
      })}
    </GenreStyled>
  );
}
