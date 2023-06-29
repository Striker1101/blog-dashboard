import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "./styles/Flex.styled";
import { NavStyled } from "./styles/Nav.styled";
export default function Nav() {
  const key = localStorage.getItem("token");
 console.log(key)
  return (
    <NavStyled>
      <Flex smDir="row" lgDir="row" gap="10px">
        <a href="http://erose.vercel.app"> Home</a>
        <Link to={"/"}>Blog Post</Link>
        {key ? (
          <Link to={"/log-out"}>Log Out</Link>
        ) : (
          <Link to={"/sign-up"}>Sign up</Link>
        )}
        <Link to={"/log-in"}>Login</Link>
      </Flex>
    </NavStyled>
  );
}
