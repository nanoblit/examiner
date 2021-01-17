import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledQuestionSubpage = styled.main`
  ${contentDisplay};

  .question {
    margin: 2rem 0 2rem 0;
  }

  .answer {
    margin-bottom: 1rem;
  }
`;

export default StyledQuestionSubpage;
