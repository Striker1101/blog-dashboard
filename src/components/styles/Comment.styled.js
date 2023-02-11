import styled from "styled-components";

export const CommentStyled_Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;

  h1 {
    text-align: center;
  }

  h6 {
    float: right;
    position: relative;
    bottom: 30px;
    padding-right: 5px;
  }
`;
export const PackTwo = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Image_Container = styled.div`
  float: left;
`;

export const PackOne = styled.div`
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-bottom: 5px;
  width: 100%;
  word-break: break-all;
`;
