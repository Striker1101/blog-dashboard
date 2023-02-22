import styled from "styled-components";

export const NavStyled = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 5px;
  background-color: ${({ theme }) => theme.colors.nav};
`;
