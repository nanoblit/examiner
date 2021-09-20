import React, { createRef, useEffect, useMemo } from "react";

import StyledQuestion from "./QuestionFieldStyle";
import setupAutoResize from "../../../utils/setupAutoResize";

type Props = {
  text?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
};

// TODO: Replace classes with styled compoenents

const QuestionField: React.FC<Props> = ({
  text,
  onChange,
  readonly = false,
}) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();
  const textWithLinebreaks = useMemo(
    () => text?.split("\n").map((str, idx) => <p key={idx}>{str}</p>),
    [text]
  );

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
        <div className="questionText">{textWithLinebreaks}</div>
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
