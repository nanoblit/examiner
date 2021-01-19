import { Question } from "../../models/Question";

import React from "react";
import StyledQuestionSubpage from "./QuestionSubpageStyle";
import Button from "../common/Button/Button";
import QuestionField from "../common/QuestionField/QuestionField";
import AnswerField from "../common/AnswerField/AnswerField";

type Props = {
  question: Question;
  selectedAnswers: number[];
  score: string;
  percentScore: string;
  questionsToAnswer: number;
  submitAnswer: () => void;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
};

const QuestionSubpage: React.FC<Props> = ({
  question,
  selectedAnswers,
  score,
  percentScore,
  questionsToAnswer,
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
    <StyledQuestionSubpage>
      <QuestionField text={question.question} readonly />
        {question.answers.map((answer, idx) => (
          <AnswerField
            key={idx}
            text={answer}
            isChecked={isChecked(idx)}
            onChangeCheckbox={() => switchSelectedAnswer(idx)}
            fullBodyCheckbox
            textareaReadOnly
          />
        ))}
      <p>{questionsToAnswer} {questionsToAnswer === 1 ? "question" : "questions"} left</p>
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>
        Your score: {score} ({percentScore})
      </p>
      <Button onClick={submitAnswer}>Answer</Button>
    </StyledQuestionSubpage>
  );
};

export default QuestionSubpage;
