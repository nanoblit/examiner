import React, { useMemo } from "react";
import StyledQuestion from "./QuestionListElementStyle";

type Props = { text: string };

const QuestionListElement: React.FC<Props> = ({ text }) => {
  const textWithLinebreaks = useMemo(
    () => text?.split("\n").map((str, idx) => <p key={idx}>{str}</p>),
    [text]
  );

  return (
    <StyledQuestion>
      {textWithLinebreaks}
    </StyledQuestion>
  );
};

export default QuestionListElement;
