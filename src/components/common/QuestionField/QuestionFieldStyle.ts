import styled from "styled-components";
import {
  buttonColor,
  borderRadius,
  shadow,
  logoColor,
} from "../../../styles/values";

type Props = {
  textareaReadOnly: boolean;
};

const StyledQuestion = styled.div<Props>`
  width: 100%;
  position: relative;

  > .questionText,
  > textarea {
    border: none;
    border-radius: ${borderRadius};
    font-size: 1.4rem;
    background-color: ${buttonColor};
    box-shadow: ${shadow};
    width: 100%;
    padding: 1rem
      ${({ textareaReadOnly }) => (textareaReadOnly ? "1rem" : "4rem")} 1rem
      1.5rem;
    display: block;
    resize: none;
  }

  .questionIcons {
    pointer-events: none;
    width: ${({ textareaReadOnly }) => (textareaReadOnly ? "0" : "4rem")};
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;

    > i {
      color: ${logoColor};
      cursor: default;
    }
  }
`;

export default StyledQuestion;
