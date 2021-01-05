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
`;

export default StyledDiv;
