import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledDiv = styled.div`
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
    margin-bottom: 2rem;
  }

  .questionButtons {
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