import { Question } from "../../models/Question";

import React from "react";
import AnswerField, { AnswerFieldType } from "../common/AnswerField/AnswerField";
import StyledAnswerSubpage from "./AnswerSubpageStyle";
import QuestionField from "../common/QuestionField/QuestionField";
import Button from "../common/Button/Button";

type Props = {
  question: Question;
  selectedAnswers: number[];
  score: string;
  percentScore: string;
  questionIds: string[];
  questionsToAnswer: number;
  nextQuestion: () => void;
  finishAnswering: () => void;
};

const AnswerSubpage: React.FC<Props> = ({
  question,
  selectedAnswers,
  score,
  percentScore,
  questionIds,
  questionsToAnswer,
  nextQuestion,
  finishAnswering,
}) => {
  const isAnswerCorrect = (idx: number) => {
    const correctAnswerIndex = question.correctAnswers.indexOf(idx);
    return correctAnswerIndex !== undefined && correctAnswerIndex > -1;
  };

  const isChecked = (idx: number) => {
    return selectedAnswers.some((answer) => answer === idx);
  };

  return (
    <StyledAnswerSubpage>
      <QuestionField text={question.question} readonly />
      <p>The highlighted answers are correct</p>
      {question.answers.map((answer, idx) => (
        <AnswerField
          key={idx}
          type={AnswerFieldType.Answer}
          text={answer}
          defaultChecked={isChecked(idx)}
          isHighlighted={isAnswerCorrect(idx)}
          isChecked={isChecked(idx)}
        />
      ))}
      {!question.explanation || (
        <QuestionField text={question.explanation} readonly />
      )}
      <p>{questionsToAnswer} {questionsToAnswer === 1 ? "question" : "questions"} left</p>
      <p>
        You've answered this question {question.correctlyAnsweredCount ?? 0}/
        {question.totalAnsweredCount ?? 0} times correctly
      </p>
      <p>
        Your score: {score} ({percentScore})
      </p>
      <div className="buttons">
        {questionIds.length > 1 && (
          <Button onClick={nextQuestion}>Next Question</Button>
        )}
        <Button onClick={finishAnswering}>Finish</Button>
      </div>
    </StyledAnswerSubpage>
  );
};

export default AnswerSubpage;
