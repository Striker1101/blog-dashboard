import styled from "styled-components";

export const GenreStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 10px;
  align-items: center;
  justify-content: center;

  input[name="text"] {
    width: 80%;
    height: 20px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 5px;
`;
