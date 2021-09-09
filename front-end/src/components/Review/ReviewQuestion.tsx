import React, { useMemo, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router";
import { useDispatch } from "react-redux";

import Layout from "../common/Layout/Layout";
import QuestionField from "../common/QuestionField/QuestionField";
import { useTypedSelector } from "../../redux/reducers";
import AnswerField, {
  AnswerFieldType,
} from "../common/AnswerField/AnswerField";
import Button from "../common/Button/Button";
import { addOrEditReviewSessionItemAction } from "../../redux/actions";

/*
If you go open this page and it's already answered -> redirect to answer
*/

const ReviewQuestion: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { questionId }: { questionId: string } = useParams();
  const questions = useTypedSelector(({ questions }) => questions);
  const reviewSession = useTypedSelector(({ reviewSession }) => reviewSession);
  const dispatch = useDispatch();
  const question = useMemo(
    () => questions.find((q) => q.id === questionId),
    [questions, questionId]
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  );
  const questionsToAnswer = useMemo(
    () => questions.length - Object.keys(reviewSession).length,
    [questions, reviewSession]
  );
  const score = useMemo(() => {
    let s = 0;
    for (const reviewedId in reviewSession) {
      const givenAnswers = reviewSession[reviewedId].givenAnswers;
      const correctAnswers =
        questions.find((q) => q.id === reviewedId)?.correctAnswers ?? [];

      if (
        JSON.stringify(givenAnswers.sort()) ===
        JSON.stringify(correctAnswers.sort())
      ) {
        s++;
      }
    }
    return `${(s / questions.length) * 100}%`;
  }, [questions, reviewSession]);

  const switchSelectedAnswer = (id: number) => {
    const newAnswers = new Set(selectedAnswers);
    if (selectedAnswers.has(id)) {
      newAnswers.delete(id);
    } else {
      newAnswers.add(id);
    }
    setSelectedAnswers(newAnswers);
  };

  const isChecked = (id: number) => selectedAnswers.has(id);

  const submitAnswer = () => {
    dispatch(
      addOrEditReviewSessionItemAction(questionId, {
        givenAnswers: Array.from(selectedAnswers),
      })
    );
    history.push(`${match.path}/answer`);
  };

  return (
    <Layout>
      <QuestionField text={question?.question} readonly />
      <p>Pick the correct answers:</p>
      {question?.answers.map((answer, idx) => (
        <AnswerField
          key={idx}
          type={AnswerFieldType.Selectable}
          text={answer}
          isChecked={isChecked(idx)}
          onChangeCheckbox={() => switchSelectedAnswer(idx)}
        />
      ))}
      <p>
        {questionsToAnswer} {questionsToAnswer === 1 ? "question" : "questions"}{" "}
        left
      </p>
      <p>Your score: {score}</p>
      <Button onClick={submitAnswer}>Answer</Button>
    </Layout>
  );
};

export default ReviewQuestion;
