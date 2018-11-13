import styled from "styled-components";

import List from "./List";
import Item from "./Item";
import Title from "./Title";
import Input from "./Input";
import Button from "./Button";

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem auto;
    position: relative;
`;

Form.List = List;
Form.Item = Item;
Form.Title = Title;
Form.Input = Input;
Form.Button = Button;

export default Form;