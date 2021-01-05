import { Question } from "../../models/Question";

import React from "react";
import AnswerField from "../common/AnswerField/AnswerField";
import StyledDiv from "./QuestionSubpageStyle";
import Button from "../common/Button/Button";
import QuestionField from "../common/QuestionField/QuestionField";

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
    <StyledDiv>
      <QuestionField text={question.question} readonly />
      {question.answers.map((answer, idx) => (
        <AnswerField
        key={idx}
        text={answer}
        isChecked={isChecked(idx)}
        onChangeCheckbox={() => switchSelectedAnswer(idx)}
        textareaReadOnly
      />
      ))}
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>Your score: {score}</p>
      <Button onClick={submitAnswer}>Answer</Button>
    </StyledDiv>
  );
};

export default QuestionSubpage;
