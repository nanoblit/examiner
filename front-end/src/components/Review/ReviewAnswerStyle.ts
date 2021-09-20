import styled from "styled-components";
import { centeredColumn } from "../../styles/values";
import StyledQuestion from "../common/QuestionField/QuestionFieldStyle";
import StyledAnswer from "../common/AnswerField/AnswerFieldStyle";

export const ReviewAnswerButtons = styled.div``;

const StyledAnswerContent = styled.main`
  ${centeredColumn};

  ${StyledQuestion} {
    margin: 2rem 0 2rem 0;
  }

  ${StyledAnswer} {
    margin-bottom: 1rem;
  }

  p {
    margin: 1rem 0;
  }

  ${ReviewAnswerButtons} {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    button {
      margin-right: 3rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export default StyledAnswerContent;
