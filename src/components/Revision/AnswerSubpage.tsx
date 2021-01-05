import { Question } from "../../models/Question";

import React from "react";
import AnswerField from "../common/AnswerField/AnswerField";
import StyledDiv from "./AnswerSubpageStyle";
import QuestionField from "../common/QuestionField/QuestionField";

type props = {
  question: Question;
  selectedAnswers: number[];
  score: string;
  buttons: React.ReactNode;
};

const AnswerSubpage: React.FC<props> = ({
  question,
  selectedAnswers,
  score,
  buttons,
}) => {
  const isAnswerCorrect = (idx: number) => {
    const correctAnswerIndex = question.correctAnswers.indexOf(idx);
    return correctAnswerIndex !== undefined && correctAnswerIndex > -1;
  };

  const isChecked = (idx: number) => {
    return selectedAnswers.some((answer) => answer === idx);
  };

  return (
    <StyledDiv>
      <QuestionField text={question.question} readonly />
      {question.answers.map((answer, idx) => (
        <AnswerField
          key={idx}
          text={answer}
          defaultChecked={isChecked(idx)}
          isHighlighted={isAnswerCorrect(idx)}
          isChecked={isChecked(idx)}
          textareaReadOnly
          checkboxReadOnly
        />
      ))}
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>Your score: {score}</p>
      <div className="buttons">{buttons}</div>
    </StyledDiv>
  );
};

export default AnswerSubpage;
