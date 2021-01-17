import styled from "styled-components";
import {
  contentDisplay,
  buttonColor,
  shadow,
  borderRadius,
  darkButtonColor,
  logoColor,
} from "../../styles/values";

const StyledEditor = styled.main`
  ${contentDisplay};

  > * {
    margin-top: 3rem;
  }

  > .questionLink {
    margin-top: 3rem;
    width: 100%;
    text-decoration: none;
  }

  > .questionLink ~ .questionLink {
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
