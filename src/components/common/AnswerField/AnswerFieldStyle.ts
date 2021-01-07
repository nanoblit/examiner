import styled from "styled-components";
import {
  buttonColor,
  borderRadius,
  shadow,
  logoColor,
  greenColor,
  redColor,
  highlightColor,
} from "../../../styles/values";

type Props = {
  textareaReadOnly: boolean;
  checkboxReadOnly: boolean;
  isHighlighted: boolean;
};

const StyledAnswer = styled.div<Props>`
  width: 100%;
  position: relative;

  > .answerText,
  > textarea {
    outline: none;
    border: none;
    border-radius: ${borderRadius};
    font-size: 1.4rem;
    background-color: ${({ isHighlighted }) =>
      isHighlighted ? highlightColor : buttonColor};
    box-shadow: ${shadow};
    width: 100%;
    padding: 1rem
      ${({ textareaReadOnly }) => (textareaReadOnly ? "4rem" : "8rem")} 1rem
      1.5rem;
  }

  > textarea {
    resize: none;
  }

  .answerIcons {
    pointer-events: none;
    width: ${({ textareaReadOnly }) => (textareaReadOnly ? "4rem" : "8rem")};
    right: 0;
    top: 0;
    height: calc(100% - 6px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;

    > i {
      color: ${logoColor};
      cursor: default;
    }

    .checkbox {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        cursor: ${({ checkboxReadOnly }) =>
          checkboxReadOnly ? "default" : "pointer"};
        opacity: 0;
        pointer-events: auto;
        width: 2.4rem;
        height: 2.4rem;
        margin: 0;
      }

      i {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        top: 0;

        &.iconChecked {
          color: ${greenColor};
        }
        &.iconUnchecked {
          color: ${redColor};
        }
      }
    }
  }
`;

export default StyledAnswer;
