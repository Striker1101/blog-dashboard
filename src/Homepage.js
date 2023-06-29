import React from "react";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";
import { fetchGet_ID_toggle } from "./post";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./redux/action";
import GenreList from "./components/GenreList";
import { Flex } from "./components/styles/Flex.styled";
import { CardStyle } from "./components/styles/Card.styled";
import { LoaderStyled } from "./components/styles/Loader.styled";
import { Button } from "./components/styles/Button.styled";
import { HomepageStyled } from "./components/styles/Homepage.styled";
export default function Index({ setIndex }) {
  //collect a post from store
  const collector = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  //toggle between publish and unpublished
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
      dispatch(update(data.json.posts));
    });
  }
  console.log(collector);
  return (
    <HomepageStyled>
      <GenreList />
      <hr />
      <div>
        {collector.posts.length ? (
          <Flex smDir="column" lgDir="column">
            <CardStyle>
              {collector.posts.map((post, i) => {
                return (
                  <Card
                    setIndex={setIndex}
                    key={i}
                    index={i}
                    post={post}
                    toggle={toggle}
                  />
                );
              })}
            </CardStyle>
            <div>
              <Link to={"/add-post"}>
                <Button>Add Posts</Button>
              </Link>
              <Link to={"/add-genre"}>
                <Button>Add Genre</Button>
              </Link>
            </div>
          </Flex>
        ) : (
          <LoaderStyled>
            <Loader />
          </LoaderStyled>
        )}
      </div>
    </HomepageStyled>
  );
}
