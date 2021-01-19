import React, { createRef, useEffect } from "react";

import StyledQuestion from "./QuestionFieldStyle";
import setupAutoResize from "../../../utils/setupAutoResize";

type Props = {
  text?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
};

const QuestionField: React.FC<Props> = ({
  text,
  onChange,
  readonly = false,
}) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    setupAutoResize(textAreaRef);
    textAreaRef.current?.blur();
  }, []);

  useEffect(() => {
    let change = new Event("change");
    textAreaRef.current?.dispatchEvent(change);
  }, [text]);

  return (
    <StyledQuestion className="question" textareaReadOnly={readonly}>
      {readonly ? (
        <div className="questionText">
          <span>{text}</span>
        </div>
      ) : (
        <textarea
          ref={textAreaRef}
          rows={1}
          value={text}
          onChange={onChange}
        ></textarea>
      )}
      <div className="questionIcons">
        {readonly || <i className="material-icons">create</i>}
      </div>
    </StyledQuestion>
  );
};

export default QuestionField;
