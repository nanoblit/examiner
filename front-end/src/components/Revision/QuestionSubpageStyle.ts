import styled from "styled-components";
import { centeredColumn } from "../../styles/values";

const StyledQuestionSubpage = styled.main`
  ${centeredColumn};

  .question {
    margin: 2rem 0 2rem 0;
  }

  .answer {
    margin-bottom: 1rem;
  }

  p {
    margin: 1rem 0;
  }
`;

export default StyledQuestionSubpage;
