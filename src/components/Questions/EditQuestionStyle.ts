import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledEditQuestion = styled.main`
  ${contentDisplay};

  .answers {
    width: 100%;

    .answer {
      margin-bottom: 1rem;
    }
  }

  .answersButtons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .questionButtons {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;

    button {
      margin-right: 3rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export default StyledEditQuestion;