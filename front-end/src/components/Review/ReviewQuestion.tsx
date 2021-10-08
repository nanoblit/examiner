import React, { useState } from "react";
import { useParams, useHistory, useRouteMatch, Redirect } from "react-router";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../redux/hooks";
import Layout from "../common/Layout/Layout";
import QuestionField from "../common/QuestionField/QuestionField";
import { useAppSelector } from "../../redux/hooks";
import AnswerField, {
  AnswerFieldType,
} from "../common/AnswerField/AnswerField";
import Button from "../common/Button/Button";
import { addOrEditReviewSessionItem } from "../../redux/slices/reviewSessionSlice";
import scoreSelector from "../../utils/selectors/scoreSelector";
import questionsToAnswerCountSelector from "../../utils/selectors/questionsToAnswerCountSelector";
import questionSelector from "../../utils/selectors/questionSelector";
import useAsweredQuestionIds from "../../utils/hooks/useAnsweredQuestionIds";
import ReviewQuestionContainer from "./ReviewQuestionStyle";

const ReviewQuestion: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { questionId }: { questionId: string } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  );
  const dispatch = useAppDispatch();
  const questions = useAppSelector(({ questions }) => questions);
  const answeredQuestionIds = useAsweredQuestionIds();
  const question = useAppSelector(questionSelector(questionId));
  const questionsToAnswerCount = useAppSelector(questionsToAnswerCountSelector);
  const score = useAppSelector(scoreSelector);

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
    if (selectedAnswers.size === 0) {
      return toast.error("Please, select at least one answer");
    }
    dispatch(
      addOrEditReviewSessionItem({
        id: questionId,
        data: {
          givenAnswers: Array.from(selectedAnswers),
        },
      })
    );
    history.push(`${match.url}/answer`);
  };

  // If this question doesn't exist, go to /review
  if (!questions.some((q) => q.id === questionId)) {
    return <Redirect to="/review" />;
  }

  // If this question has been answered, go to answer
  if (answeredQuestionIds.some((aqId) => aqId === questionId)) {
    return <Redirect to={`${match.url}/answer`} />;
  }

  return (
    <Layout>
      <ReviewQuestionContainer>
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
          {questionsToAnswerCount}{" "}
          {questionsToAnswerCount === 1 ? "question" : "questions"} left
        </p>
        <p>Your score: {score}</p>
        <Button onClick={submitAnswer}>Answer</Button>
      </ReviewQuestionContainer>
    </Layout>
  );
};

export default ReviewQuestion;
