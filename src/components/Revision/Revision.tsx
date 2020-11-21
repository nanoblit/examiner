import React, { useState, useEffect, useMemo } from "react";

import { useTypedSelector } from "../../reducers";
import { shuffle } from "../../utils/shuffle";

const Revision: React.FC = () => {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [questionIndexes, setQuestionIndexes] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const currentIndex = useMemo(
    () => (questionIndexes.length > 0 ? questionIndexes[0] : -1),
    [questionIndexes]
  );
  const questions = useTypedSelector(({ questions }) => questions);

  const isChecked = (idx: number) => {
    return selectedAnswers.some((answer) => answer === idx);
  };

  const switchSelectedAnswer = (idx: number) => {
    selectedAnswers.includes(idx)
      ? setSelectedAnswers((prev) => prev.filter((answer) => answer !== idx))
      : setSelectedAnswers((prev) => [...prev, idx].sort((a, b) => a - b));
  };

  const tryAgain = () => {
    setQuestionIndexes(() => shuffle(Array.from(questions.keys())));
    setScore(() => 0);
    setMaxScore(() => 0);
    setAnswered(() => false);
  };

  const answerBackgroundColor = (idx: number) => {
    return questions[currentIndex].correctAnswers.indexOf(idx) > -1
      ? "lightgreen"
      : "none";
  };

  const nextQuestion = () => {
    setAnswered(() => false);
    setSelectedAnswers(() => []);
    // Remove first question index.
    setQuestionIndexes((prev) => [...prev.filter((_, idx) => idx !== 0)]);
  };

  const finishAnswering = () => {
    setSelectedAnswers(() => []);
    // Because current index is taken from question indexes.
    setQuestionIndexes(() => []);
  };

  const countCorrectAnswers = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer) => {
      if (
        questions[currentIndex].correctAnswers.some(
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
    setScore((prev) => {
      const newPrev = (prev +=
        correctAnswers / questions[currentIndex].correctAnswers.length);
      return isNaN(newPrev) ? 0 : newPrev;
    });
    setMaxScore((prev) => (prev += 1));
    setAnswered(() => true);
  };

  useEffect(() => {
    if (questionIndexes.length === 0) {
      setQuestionIndexes(() => shuffle(Array.from(questions.keys())));
    }
  }, [questions]);

  useEffect(() => {
    console.log(questionIndexes);
  }, [questionIndexes]);

  const render = () => {
    if (currentIndex === -1) {
      return (
        <>
          <p>
            Final score: {Math.round(score * 100) / 100}/{maxScore}
          </p>
          {questions.length > 0 && <button onClick={tryAgain}>TryAgain</button>}
        </>
      );
    } else if (answered) {
      return (
        <>
          <p>{questions[currentIndex].question}</p>
          {questions[currentIndex].answers.map((answer, idx) => (
            <div key={idx}>
              <span style={{ backgroundColor: answerBackgroundColor(idx) }}>
                {answer}
              </span>
              <input checked={isChecked(idx)} type="checkbox"></input>
            </div>
          ))}
          <p>
            Your score: {Math.round(score * 100) / 100}/{maxScore}
          </p>
          {questionIndexes.length > 1 && (
            <button onClick={nextQuestion}>Next Question</button>
          )}
          <button onClick={finishAnswering}>Finish</button>
        </>
      );
    } else {
      return (
        <>
          <p>{questions[currentIndex].question}</p>
          {questions[currentIndex].answers.map((answer, idx) => (
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
            Your score: {Math.round(score * 100) / 100}/{maxScore}
          </p>
          <button onClick={submitAnswer}>Submit</button>
        </>
      );
    }
  };

  return <div>{render()}</div>;
};

export default Revision;
