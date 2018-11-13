import styled from "styled-components";

const List = styled.ul`
    width: calc(100% - 4rem);
    background-color: #FFF;
    max-height: 15rem;
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 0 0 15px 15px;
    padding: .5rem;
    z-index: 1;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
    ::-webkit-scrollbar {
        width: 2px;
    }
    ::-webkit-scrollbar-track {
        display: none;
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #045285; 
        border-radius: 10px;
    }
`;

export default List;