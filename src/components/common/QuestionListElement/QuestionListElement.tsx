import React, { useMemo, useEffect } from "react";
import StyledQuestion from "./QuestionListElementStyle";

type Props = { text: string };

const QuestionListElement: React.FC<Props> = ({ text }) => {
  const textWithLinebreaks = useMemo(
    () => text?.split("\n").map((str) => <p>{str}</p>),
    [text]
  );

  useEffect(() => console.log(textWithLinebreaks), [textWithLinebreaks]);

  return (
    <StyledQuestion>
      {textWithLinebreaks}
    </StyledQuestion>
  );
};

export default QuestionListElement;
