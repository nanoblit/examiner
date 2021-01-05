import React from "react";

import StyledAnswer from "./AnswerFieldStyle";

type Props = {
  text?: string;
  onChangeText?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaReadOnly?: boolean;
  checkboxReadOnly?: boolean;
  defaultChecked?: boolean;
  isChecked: boolean;
  isHighlighted?: boolean;
  onChangeCheckbox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnswerField: React.FC<Props> = ({
  text,
  onChangeText,
  textareaReadOnly = false,
  checkboxReadOnly = false,
  defaultChecked = false,
  isChecked,
  isHighlighted = false,
  onChangeCheckbox,
}) => {
  return (
    <StyledAnswer
      className="answer"
      textareaReadOnly={textareaReadOnly}
      checkboxReadOnly={checkboxReadOnly}
      isHighlighted={isHighlighted}
    >
      {textareaReadOnly ? (
        <div className="answerText">
          <span>{text}</span>
        </div>
      ) : (
        <textarea value={text} onChange={onChangeText}></textarea>
      )}
      <div className="answerIcons">
        {textareaReadOnly || <i className="material-icons">create</i>}
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={onChangeCheckbox}
            defaultChecked={defaultChecked}
            readOnly={checkboxReadOnly}
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
