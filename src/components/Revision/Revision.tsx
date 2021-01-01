import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../reducers";
import { shuffle } from "../../utils/shuffle";
import { editQuestionAction, setQuestionsAction } from "../../actions";
import RevisionTypeSelectionSubpage from "./RevisionTypeSelectionSubpage";
import FinalScoreSubpage from "./FinalScoreSubpage";
import QuestionSubpage from "./QuestionSubpage";
import AnswerSubpage from "./AnswerSubpage";

export enum RevisionType {
  None,
  NewSession,
  ContinueLastSession,
  IncorrectAndUnansweredQuestions,
}

/*
- When you open the revision sub-page it asks if you want to continue or start a new session.
- If you choose to start a new session, it takes all the unanswered questions and puts them in questionIndexes
- Otherwise it acts normally.
*/

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
    [currentId]
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
    // Because current index is taken from question indexes.
    setQuestionIds(() => []);
  };

  const countCorrectAnswers = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer) => {
      if (
        currentQuestion?.correctAnswers.some(
          (correctAnswer) => correctAnswer === answer
        )
      ) {
        correctAnswers++;
      }
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
          correctAnswers === currentQuestion.correctAnswers.length
            ? true
            : false,
        totalAnsweredCount: questionTotalAnsweredCount + 1,
        correctlyAnsweredCount:
          questionCorrectlyAnsweredCount +
          (correctAnswers === currentQuestion.correctAnswers.length ? 1 : 0),
      })
    );
    setScore((prev) => {
      const newPrev = (prev +=
        correctAnswers / currentQuestion.correctAnswers.length);
      return isNaN(newPrev) ? 0 : newPrev;
    });
    setMaxScore((prev) => (prev += 1));
    setAnswered(() => true);
  };

  const countScore = () => `${Math.round(score * 100) / 100}/${maxScore}`;

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
            shuffle(
              questions
                .filter(
                  ({ lastAnsweredCorrectly }) =>
                    lastAnsweredCorrectly === undefined
                )
                .map(({ id }) => id)
            )
          );
          break;
        case RevisionType.IncorrectAndUnansweredQuestions:
          setQuestionIds(() =>
            shuffle(
              questions
                .filter(({ lastAnsweredCorrectly }) => !lastAnsweredCorrectly)
                .map(({ id }) => id)
            )
          );
          break;
        default:
          return;
      }
    }
  }, [revisionType]);

  const render = () => {
    if (revisionType === RevisionType.None) {
      return <RevisionTypeSelectionSubpage setRevisionType={setRevisionType} />;
    } else if (currentId === "") {
      return (
        <FinalScoreSubpage
          tryAgain={tryAgain}
          questions={questions}
          score={countScore()}
        />
      );
    } else if (!answered) {
      return (
        currentQuestion && (
          <QuestionSubpage
            question={currentQuestion}
            selectedAnswers={selectedAnswers}
            score={countScore()}
            submitAnswer={submitAnswer}
            setSelectedAnswers={setSelectedAnswers}
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
            buttons={
              <>
                {questionIds.length > 1 && (
                  <button onClick={nextQuestion}>Next Question</button>
                )}
                <button onClick={finishAnswering}>Finish</button>
              </>
            }
          />
        )
      );
    }
  };

  return <div>{render()}</div>;
};

export default Revision;
