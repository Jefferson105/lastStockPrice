import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.img`
  animation: ${rotate} 2s linear infinite;
  height: 2rem;
`;

export default Loading;