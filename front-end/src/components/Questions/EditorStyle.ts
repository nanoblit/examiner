import styled from "styled-components";
import {
  buttonColor,
  shadow,
  borderRadius,
  darkButtonColor,
  logoColor,
  centeredColumn,
} from "../../styles/values";
import { Link } from "react-router-dom";

export const QuestionLink = styled(Link)``;

const StyledEditor = styled.main`
  ${centeredColumn};

  > p {
    margin: 3rem 0 0 0;
  }

  > * {
    margin-top: 3rem;
  }

  > ${QuestionLink} {
    width: 100%;
    text-decoration: none;
  }

  > ${QuestionLink} ~ ${QuestionLink} {
    margin-top: 1.5rem;
  }

  .paginationContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    li {
      margin-bottom: 1rem;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      &.selected a {
        background: ${logoColor};
      }

      &.paginationMove a {
        display: flex;
        height: 3.4rem;

        & i {
          cursor: pointer;
          
        }
      }

      a {
        border: none;
        background: ${buttonColor};
        box-shadow: ${shadow};
        padding: 5px 10px;
        border-radius: ${borderRadius};
        position: relative;
        cursor: pointer;

        &:hover {
          background: ${darkButtonColor};
        }
      }
    }
  }
`;

export default StyledEditor;
