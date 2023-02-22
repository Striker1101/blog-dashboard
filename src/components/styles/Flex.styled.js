import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ lgDir }) => lgDir};
  gap: ${({ gap }) => gap || "0px"};

  & > div,
  & > ul {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: ${({ smDir }) => smDir};
    text-align: center;
  }
`;
