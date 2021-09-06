import styled from "styled-components";
import { centeredColumn } from "../../styles/values";

const StyledRevisionTypeSelectionSubpage = styled.main`
  ${centeredColumn};

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