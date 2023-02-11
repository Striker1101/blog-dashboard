import styled from "styled-components";

export const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 30px;
  }

  h5 {
    float: right;
    margin-right: 5px;
  }

  div {
    width: 100%;
  }

  h2 {
    textalign: center;
  }

  hr {
    width: 70vw;
  }
`;

export const Card_Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  width: 80vw;
  flex-direction: column;
  border-radius: 15px;
`;
