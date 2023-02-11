import styled from "styled-components";

export const SVG_Styled = styled.svg`
  width: 100vw;
  height: 100vh;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #right_wheel,
  #left_wheel {
    animation: wheel 2s infinite linear;
    transform-origin: center;
    transform-box: fill-box;
  }
  #head {
    animation: head 1s ease-in-out infinite alternate;
    transform-origin: center;
    transform-box: fill-box;
  }
  #woman_on_wheel {
    animation: bike 1s ease-in-out infinite alternate;
    transform-origin: bottom;
  }
  #cloud1,
  #cloud2 {
    animation: cloud 2s ease-in-out infinite alternate;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes cloud {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(50%);
    }
  }

  @keyframes bike {
    from {
      transform: rotateX(0deg);
    }
    to {
      transform: rotateX(20deg);
    }
  }

  @keyframes wheel {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes head {
    from {
      transform: translateY(0%);
    }
    from {
      transform: translateY(15%);
    }
  }
`;

export const Animate_Container = styled.div`
  position: absolute;
  z-index: -3;
`;
