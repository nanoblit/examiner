import styled from "styled-components";
import { centeredColumn } from "../../styles/values";
import StyledQuestion from "../common/QuestionField/QuestionFieldStyle";
import StyledAnswer from "../common/AnswerField/AnswerFieldStyle";

const ReviewQuestionContainer = styled.main`
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
`;

export default ReviewQuestionContainer;