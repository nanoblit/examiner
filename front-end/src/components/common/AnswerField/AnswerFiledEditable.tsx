import React, { createRef, useEffect } from "react";

import StyledAnswer from "./AnswerFieldStyle";
import setupAutoResize from "../../../utils/setupAutoResize";

type Props = {
  text?: string;
  onChangeText?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultChecked: boolean;
  isChecked: boolean;
  onChangeCheckbox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnswerFieldEditable: React.FC<Props> = ({
  text,
  onChangeText,
  defaultChecked,
  isChecked,
  onChangeCheckbox,
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
    <StyledAnswer
      className="answer"
      textareaReadOnly={false}
      checkboxReadOnly={false}
      isHighlighted={false}
      fullBodyCheckbox={false}
      onClick={undefined}
    >
      <textarea
        ref={textAreaRef}
        rows={1}
        value={text}
        onChange={onChangeText}
      ></textarea>
      <div className="answerIcons">
        <i className="material-icons">create</i>
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={onChangeCheckbox}
            defaultChecked={defaultChecked}
          ></input>
          {isChecked ? (
            <i className="material-icons iconChecked">done</i>
          ) : (
            <i className="material-icons iconUnchecked">close</i>
          )}
        </div>
      </div>
    </StyledAnswer>
  );
};

export default AnswerFieldEditable;
