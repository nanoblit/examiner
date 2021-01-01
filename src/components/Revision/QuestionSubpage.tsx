import { Question } from "../../models/Question";

import React from "react";

type props = {
  question: Question;
  selectedAnswers: number[];
  score: string;
  submitAnswer: () => void;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
};

const QuestionSubpage: React.FC<props> = ({
  question,
  selectedAnswers,
  score,
  submitAnswer,
  setSelectedAnswers,
}) => {
  const isChecked = (idx: number) => {
    return selectedAnswers.some((answer) => answer === idx);
  };

  const switchSelectedAnswer = (idx: number) => {
    selectedAnswers.includes(idx)
      ? setSelectedAnswers((prev) => prev.filter((answer) => answer !== idx))
      : setSelectedAnswers((prev) => [...prev, idx].sort((a, b) => a - b));
  };

  return (
    <>
      <p>{question.question}</p>
      {question.answers.map((answer, idx) => (
        <div key={idx}>
          <span>{answer}</span>
          <input
            type="checkbox"
            checked={isChecked(idx)}
            onChange={() => switchSelectedAnswer(idx)}
          ></input>
        </div>
      ))}
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>Your score: {score}</p>
      <button onClick={submitAnswer}>Submit</button>
    </>
  );
};

export default QuestionSubpage;
