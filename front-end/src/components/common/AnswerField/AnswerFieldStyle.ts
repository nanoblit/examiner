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
import { AnswerFieldType } from "./AnswerField";

export const AnswerText = styled.div``;

type Props = {
  type: AnswerFieldType;
  isHighlighted: boolean;
};

const StyledAnswer = styled.div<Props>`
  width: 100%;
  position: relative;
  ${({ type }) =>
    type === AnswerFieldType.Selectable ? "cursor: pointer;" : ""}

  ${AnswerText} p {
    margin: 0;
  }

  ${AnswerText} {
    border: none;
    border-radius: ${borderRadius};
    font-size: 1.4rem;
    background-color: ${({ isHighlighted }) =>
      isHighlighted ? highlightColor : buttonColor};
    box-shadow: ${shadow};
    width: 100%;
    padding: 1rem
      ${({ type }) => (type === AnswerFieldType.Editable ? "8rem" : "4rem")}
      1rem 1.5rem;
    display: block;
    resize: none;
  }

  .answerIcons {
    pointer-events: none;
    width: ${({ type }) =>
      type === AnswerFieldType.Editable ? "8rem" : "4rem"};
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

    .checkbox {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        cursor: ${({ type }) =>
          type === AnswerFieldType.Selectable ? "pointer" : "default"};
        opacity: 0;
        pointer-events: auto;
        width: 2.4rem;
        height: 2.4rem;
        margin: 0;

        &:focus + i {
          outline: auto;
          outline-color: black;
        }
      }
    }
    .iconChecked,
    .iconUnchecked {
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
`;

export default StyledAnswer;
