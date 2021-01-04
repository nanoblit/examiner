import React from "react";

import StyledAnswer from "./AnswerFieldStyle";

type Props = {
  text?: string;
  onChangeText?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  defaultChecked: boolean;
  isChecked: boolean;
  onChangeCheckbox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnswerField: React.FC<Props> = ({
  text,
  onChangeText,
  readOnly = false,
  defaultChecked,
  isChecked,
  onChangeCheckbox,
}) => {
  return (
    <StyledAnswer>
      {readOnly ? (
        <div className="answerText">
          <span>{text}</span>
        </div>
      ) : (
        <textarea value={text} onChange={onChangeText}></textarea>
      )}
      <div className="answerIcons">
        <i className="material-icons">create</i>
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={onChangeCheckbox}
            defaultChecked={defaultChecked}
            readOnly={readOnly}
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
