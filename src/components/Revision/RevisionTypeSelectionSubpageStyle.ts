import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledDiv = styled.div`
  ${contentDisplay};

  > * {
    margin-top: 2rem;
  }
`;

export default StyledDiv;