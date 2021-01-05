import React from "react";

import StyledQuestion from "./QuestionFieldStyle";

type Props = {
  text?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean
};

const QuestionField: React.FC<Props> = ({
  text,
  onChange,
  readonly = false,
}) => {
  return (
    <StyledQuestion
      className="question"
      textareaReadOnly={readonly}
    >
      {readonly ? (
        <div className="questionText">
          <span>{text}</span>
        </div>
      ) : (
        <textarea rows={4} value={text} onChange={onChange}></textarea>
      )}
      <div className="questionIcons">
        {readonly || <i className="material-icons">create</i>}
      </div>
    </StyledQuestion>
  );
};

export default QuestionField;
