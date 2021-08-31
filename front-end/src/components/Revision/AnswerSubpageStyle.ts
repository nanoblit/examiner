import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledAnswerSubpage = styled.main`
  ${contentDisplay};

  .question {
    margin: 2rem 0 2rem 0;
  }

  .answer {
    margin-bottom: 1rem;
  }

  p {
    margin: 1rem 0;
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

export default StyledAnswerSubpage;
