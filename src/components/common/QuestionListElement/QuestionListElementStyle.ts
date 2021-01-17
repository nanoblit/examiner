import styled from "styled-components";

import { borderRadius, buttonColor, darkButtonColor } from "../../../styles/values";


const StyledQuestion = styled.button`
  display: block;
  border: none;
  background: ${buttonColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  border-radius: ${borderRadius};
  cursor: pointer;
  width: 100%;
  text-align: left;
  text-decoration: none;

  &:hover {
    background: ${darkButtonColor};
  }
`;

export default StyledQuestion;