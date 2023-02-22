import styled from "styled-components";

export const HomepageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;

  hr {
    margin: 5px 10px;
    box-shadow: 2px 1px 1px 1px;
  }
  button {
    margin: 10px 10px;
  }

  @media screen {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export const GenreStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      flex-direction: row;
      text-align: center;
      justify-content: center;
    }
  }
`;
