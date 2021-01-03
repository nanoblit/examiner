import React from "react";
import StyledQuestion from "./QuestionListElementStyle";

type Props = {};

const QuestionListElement: React.FC = ({ children }) => {
  return (
    <StyledQuestion>
      <span>{children}</span>
    </StyledQuestion>
  );
};

export default QuestionListElement;
