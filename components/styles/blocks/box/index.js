import styled from "styled-components";

import Title from "./Title";
import Loading from "./Loading";
import Price from "./Price";
import DateTime from "./DateTime";

const Box = styled.div`
    background-color: #FFF;
    color: #045285;
    border-radius: 20px;
    box-shadow: 0 0 20px 0 rgba(255,255,255,.3);
    padding: 2rem;
`;

Box.Title = Title;
Box.Loading = Loading;
Box.Price = Price;
Box.DateTime = DateTime;

export default Box;