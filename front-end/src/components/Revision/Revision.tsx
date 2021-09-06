import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../redux/reducers";
import { shuffle } from "../../utils/shuffle";
import { editQuestionAction, setQuestionsAction } from "../../redux/actions";
import RevisionTypeSelectionSubpage from "./RevisionTypeSelectionSubpage";
import FinalScoreSubpage from "./FinalScoreSubpage";
import QuestionSubpage from "./QuestionSubpage";
import AnswerSubpage from "./AnswerSubpage";
import Button from "../common/Button/Button";

export enum RevisionType {
  None,
  NewSession,
  ContinueLastSession,
  IncorrectAndUnansweredQuestions,
}

const Revision: React.FC = () => {
  const [revisionType, setRevisionType] = useState(RevisionType.None);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const currentId = useMemo(
    () => (questionIds.length > 0 ? questionIds[0] : ""),
    [questionIds]
  );
  const questions = useTypedSelector(({ questions }) => questions);
  const currentQuestion = useMemo(
    () => questions.find(({ id }) => currentId === id),
    [currentId, questions]
  );
  const dispatch = useDispatch();

  const tryAgain = () => {
    dispatch(
      setQuestionsAction(
        questions.map((question) => {
          return { ...question, lastAnsweredCorrectly: undefined };
        })
      )
    );
    setQuestionIds(() => shuffle(questions.map(({ id }) => id)));
    setScore(() => 0);
    setMaxScore(() => 0);
    setAnswered(() => false);
  };

  const nextQuestion = () => {
    setAnswered(() => false);
    setSelectedAnswers(() => []);
    // Remove first question index.
    setQuestionIds((prev) => [...prev.filter((_, idx) => idx !== 0)]);
  };

  const finishAnswering = () => {
    setSelectedAnswers(() => []);
    // Because current id is taken from question ids.
    setQuestionIds(() => []);
  };

  const countCorrectAnswers = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer) => {
      currentQuestion?.correctAnswers.some(
        (correctAnswer) => correctAnswer === answer
      )
        ? correctAnswers++
        : correctAnswers--;
    });

    return correctAnswers;
  };

  const submitAnswer = () => {
    const correctAnswers = countCorrectAnswers();
    if (currentQuestion === undefined) {
      return;
    }
    const questionCorrectlyAnsweredCount =
      currentQuestion.correctlyAnsweredCount ?? 0;
    const questionTotalAnsweredCount = currentQuestion.totalAnsweredCount ?? 0;

    dispatch(
      editQuestionAction({
        ...currentQuestion,
        lastAnsweredCorrectly:
          correctAnswers === currentQuestion.correctAnswers.length,
        totalAnsweredCount: questionTotalAnsweredCount + 1,
        correctlyAnsweredCount:
          questionCorrectlyAnsweredCount +
          (correctAnswers === currentQuestion.correctAnswers.length ? 1 : 0),
      })
    );
    setScore((prev) => {
      const newScore = (prev +=
        correctAnswers === currentQuestion.correctAnswers.length ? 1 : 0);
      return isNaN(newScore) ? 0 : newScore;
    });
    setMaxScore((prev) => (prev += 1));
    setAnswered(() => true);
  };

  const countScore = () => `${Math.round(score * 100) / 100}/${maxScore}`;

  const countPercentScore = () =>
    maxScore !== 0
      ? `${Math.round((score / maxScore) * 100 * 100) / 100}%`
      : "0%";

  const getUnansweredQuestions = () =>
    questions.filter(
      ({ lastAnsweredCorrectly }) => lastAnsweredCorrectly === undefined
    );

  const getIncorrectAndUnansweredQuestions = () =>
    questions.filter(({ lastAnsweredCorrectly }) => !lastAnsweredCorrectly);

  // give correct questions based on revisionType
  useEffect(() => {
    if (questionIds.length === 0) {
      switch (revisionType) {
        case RevisionType.NewSession:
          dispatch(
            setQuestionsAction(
              questions.map((question) => {
                return { ...question, lastAnsweredCorrectly: undefined };
              })
            )
          );
          setQuestionIds(() => shuffle(questions.map(({ id }) => id)));
          break;
        case RevisionType.ContinueLastSession:
          setQuestionIds(() =>
            shuffle(getUnansweredQuestions().map(({ id }) => id))
          );
          break;
        case RevisionType.IncorrectAndUnansweredQuestions:
          setQuestionIds(() =>
            shuffle(getIncorrectAndUnansweredQuestions().map(({ id }) => id))
          );
          break;
        default:
          return;
      }
    }
  }, [revisionType]);

  const render = () => {
    if (revisionType === RevisionType.None) {
      return (
        <RevisionTypeSelectionSubpage
          setRevisionType={setRevisionType}
          allQuestions={questions.length}
          unansweredQuestions={getUnansweredQuestions().length}
          incorrectAndUnansweredQuestions={
            getIncorrectAndUnansweredQuestions().length
          }
        />
      );
    } else if (currentId === "") {
      return (
        <FinalScoreSubpage
          tryAgain={tryAgain}
          questions={questions}
          score={countScore()}
          percentScore={countPercentScore()}
        />
      );
    } else if (!answered) {
      return (
        currentQuestion && (
          <QuestionSubpage
            question={currentQuestion}
            selectedAnswers={selectedAnswers}
            score={countScore()}
            percentScore={countPercentScore()}
            submitAnswer={submitAnswer}
            setSelectedAnswers={setSelectedAnswers}
            questionsToAnswer={questionIds.length}
          />
        )
      );
    } else {
      return (
        currentQuestion && (
          <AnswerSubpage
            question={currentQuestion}
            selectedAnswers={selectedAnswers}
            score={countScore()}
            percentScore={countPercentScore()}
            questionIds={questionIds}
            nextQuestion={nextQuestion}
            finishAnswering={finishAnswering}
            questionsToAnswer={questionIds.length - 1}
          />
        )
      );
    }
  };

  return <>{render()}</>;
};

export default Revision;
