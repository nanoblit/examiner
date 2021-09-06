import styled from "styled-components";
import { centeredColumn } from "../../styles/values";

const StyledFinalScoreSubpage = styled.main`
  ${centeredColumn};

  .finalScore {
    font-size: 2rem
  }

  .answeredQuestions {
    margin-top: 0;
  }
`;

export default StyledFinalScoreSubpage;