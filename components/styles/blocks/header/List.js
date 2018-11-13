import styled, { keyframes } from 'styled-components';

const marquee = keyframes`
  from { transform: translate(0, 0); }
  to { transform: translate(-100%, 0); }
`;

const List = styled.ul`
    display: flex;
    color: #FFF;
    list-style: none;
    padding-left: 100%;
    animation: ${marquee} 60s linear infinite;
    :hover {
        animation-play-state: paused;
    }
`;

export default List;