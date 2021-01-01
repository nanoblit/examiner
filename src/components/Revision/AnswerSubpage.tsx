import { Question } from "../../models/Question";

import React from "react";

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
  const answerBackgroundColor = (idx: number) => {
    const correctAnswerIndex = question.correctAnswers.indexOf(idx);
    return correctAnswerIndex !== undefined && correctAnswerIndex > -1
      ? "lightgreen"
      : "none";
  };

  const isChecked = (idx: number) => {
    return selectedAnswers.some((answer) => answer === idx);
  };

  return (
    <>
      <p>{question.question}</p>
      {question.answers.map((answer, idx) => (
        <div key={idx}>
          <span style={{ backgroundColor: answerBackgroundColor(idx) }}>
            {answer}
          </span>
          <input checked={isChecked(idx)} type="checkbox" readOnly></input>
        </div>
      ))}
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>Your score: {score}</p>
      {buttons}
    </>
  );
};

export default AnswerSubpage;
