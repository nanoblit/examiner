import styled from "styled-components";
import { centeredColumn } from "../../styles/values";

export const ContinueGroup = styled.div``;

const ReviewPickerContainer = styled.main`
  ${centeredColumn};

  > * {
    margin-top: 2rem;
  }

  ${ContinueGroup} {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 1rem 0 0 0;
    }
  }
`;

export default ReviewPickerContainer;