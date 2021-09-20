import React, { createRef, useEffect, useMemo } from "react";

import StyledAnswer, {
  AnswerText,
  AnswerIcons,
  AnswerCheckbox,
} from "./AnswerFieldStyle";
import setupAutoResize from "../../../utils/setupAutoResize";
/*
tick and highlighted -> green outline
tick and not highlighted -> red outline
x and highlighted -> red outline
x and not hightlighted -> green outline
*/

export enum AnswerFieldType {
  Editable,
  Selectable,
  Answer,
}

type Props = {
  type: AnswerFieldType;
  text?: string;
  onChangeText?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultChecked?: boolean;
  isChecked: boolean;
  isHighlighted?: boolean;
  onChangeCheckbox?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const AnswerField: React.FC<Props> = ({
  type,
  text,
  onChangeText,
  defaultChecked = false,
  isChecked,
  isHighlighted = false,
  onChangeCheckbox,
}) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();
  const textWithLinebreaks = useMemo(
    () => text?.split("\n").map((str, idx) => <p key={idx}>{str}</p>),
    [text]
  );

  // Setup auto-resizing of the textArea
  useEffect(() => {
    if (textAreaRef.current === null) {
      return;
    }
    setupAutoResize(textAreaRef);
    textAreaRef.current.blur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run "change" event on the textArea so resize works
  useEffect(() => {
    if (textAreaRef.current === null) {
      return;
    }
    let change = new Event("change");
    textAreaRef.current.dispatchEvent(change);
  }, [text, textAreaRef]);

  return (
    <StyledAnswer
      className="answer"
      type={type}
      isHighlighted={isHighlighted}
      onClick={
        type === AnswerFieldType.Selectable ? onChangeCheckbox : undefined
      }
    >
      {type === AnswerFieldType.Editable ? (
        <AnswerText
          as="textarea"
          ref={textAreaRef}
          rows={1}
          value={text}
          onChange={onChangeText}
        ></AnswerText>
      ) : (
        <AnswerText>{textWithLinebreaks}</AnswerText>
      )}
      <AnswerIcons>
        {type === AnswerFieldType.Editable && (
          <i className="material-icons">create</i>
        )}
        <AnswerCheckbox>
          <input
            type="checkbox"
            onChange={onChangeCheckbox}
            defaultChecked={defaultChecked}
            readOnly={type === AnswerFieldType.Answer}
            disabled={type === AnswerFieldType.Answer}
          ></input>
          {isChecked ? (
            <i className="material-icons iconChecked">done</i>
          ) : (
            <i className="material-icons iconUnchecked">close</i>
          )}
        </AnswerCheckbox>
      </AnswerIcons>
    </StyledAnswer>
  );
};

export default AnswerField;
