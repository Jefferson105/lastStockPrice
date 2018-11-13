import styled from 'styled-components';

import List from "./List";
import Item from "./Item";
import Name from "./Name";
import Price from "./Price";
import DateTime from "./Date";
import Variation from "./Variation";

export const Header = styled.header`
    height: 6rem;
    background-color: rgba(255,255,255,.1);
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: hidden;
`;

Header.List = List;
Header.Item = Item;
Header.Name = Name;
Header.Price = Price;
Header.DateTime = DateTime;
Header.Variation = Variation;

export default Header;