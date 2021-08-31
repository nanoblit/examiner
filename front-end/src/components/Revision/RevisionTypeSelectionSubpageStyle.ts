import styled from "styled-components";
import { contentDisplay } from "../../styles/values";

const StyledRevisionTypeSelectionSubpage = styled.main`
  ${contentDisplay};

  > * {
    margin-top: 2rem;
  }

  .continueGroup {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 1rem 0 0 0;
    }
  }
`;

export default StyledRevisionTypeSelectionSubpage;