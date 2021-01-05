import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledDiv = styled.div`
  ${contentDisplay};

  .finalScore {
    font-size: 2rem
  }

  .answeredQuestions {
    margin-top: 0;
  }
`;

export default StyledDiv;