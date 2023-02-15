import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "./components/styles/Flex.styled";
import { Button } from "./components/styles/Button.styled";
export default function Logout() {
  const navigate = useNavigate();
  return (
    <Flex>
      <div>
        <h2>
          Are you sure you want to Log Out
          <p>click to continue</p>
        </h2>
        <Button
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
          type="submit"
        >
          LOG OUT
        </Button>
      </div>
    </Flex>
  );
}
