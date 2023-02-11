import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./post";
import { Animate_Container } from "./components/styles/Animate.Styled";
import Animation from "./components/animation";
import { LoginStyled, Content } from "./components/styles/Login.styled";
export default function Signup() {
  const form = useRef();
  const navigate = useNavigate();
  let message = useRef();
  let [toggle, setToggle] = useState(false);

  useEffect(() => {
    form.current.addEventListener("submit", (e) => {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      postData(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_MODE
            : process.env.REACT_APP_PRO_MODE
        }/auth/`,
        { username, email, password }
      ).then((data) => {
        if (data.json.message) {
          return navigate("/blog/log-in");
        } else {
          data.json.errors.forEach((data) => {
            if (data.param === "password") {
              const password = document.getElementById("password");
              password.style.border = "2px solid red";
              message.current = data.msg;
              return setToggle(!toggle);
            }
          });
        }
      });
      form.current.reset();
    });
  }, []);
  return (
    <div>
      <Animate_Container>
        <Animation />
      </Animate_Container>
      <LoginStyled
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={form}
      >
        <Content>
          <h4 style={{ textAlign: "center", color: "red" }}>
            {message.current}
          </h4>

          <label htmlFor="username">
            USERNAME
            <input required type="text" name="username" id="username" />
          </label>
          <br />
          <label htmlFor="email">
            EMAIL
            <input required type="email" name="email" id="email" />
          </label>
          <br />
          <label htmlFor="password">
            PASSWORD
            <input required type="password" name="password" id="password" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </Content>
      </LoginStyled>
    </div>
  );
}
