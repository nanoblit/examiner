import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledDiv = styled.div`
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
`;

export default StyledDiv;
