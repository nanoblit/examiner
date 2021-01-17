import React, { createRef, useEffect } from "react";

import StyledAnswer from "./AnswerFieldStyle";
import setupAutoResize from "../../../utils/setupAutoResize";

type Props = {
  text?: string;
  onChangeText?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaReadOnly?: boolean;
  checkboxReadOnly?: boolean;
  defaultChecked?: boolean;
  isChecked: boolean;
  isHighlighted?: boolean;
  fullBodyCheckbox?: boolean;
  onChangeCheckbox?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const AnswerField: React.FC<Props> = ({
  text,
  onChangeText,
  textareaReadOnly = false,
  checkboxReadOnly = false,
  defaultChecked = false,
  isChecked,
  isHighlighted = false,
  fullBodyCheckbox = false,
  onChangeCheckbox,
}) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();

  useEffect(() => setupAutoResize(textAreaRef), []);

  return (
    <StyledAnswer
      className="answer"
      textareaReadOnly={textareaReadOnly}
      checkboxReadOnly={checkboxReadOnly}
      isHighlighted={isHighlighted}
      fullBodyCheckbox={fullBodyCheckbox}
      onClick={fullBodyCheckbox ? onChangeCheckbox : undefined}
    >
      {textareaReadOnly ? (
        <div className="answerText">
          <span>{text}</span>
        </div>
      ) : (
        <textarea
          ref={textAreaRef}
          rows={1}
          value={text}
          onChange={onChangeText}
        ></textarea>
      )}
      <div className="answerIcons">
        {textareaReadOnly || <i className="material-icons">create</i>}
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={onChangeCheckbox}
            defaultChecked={defaultChecked}
            readOnly={checkboxReadOnly}
            disabled={checkboxReadOnly}
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

export default AnswerField;
