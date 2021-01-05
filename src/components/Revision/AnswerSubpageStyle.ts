import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledDiv = styled.div`
  ${contentDisplay};

  .question {
    margin: 2rem 0 2rem 0;
  }

  .answer {
    margin-bottom: 1rem;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    button {
      margin-right: 3rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export default StyledDiv;