import React, { useState } from "react";
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
import scoreSelector from "../../utils/selectors/scoreSelector";
import questionsToAnswerCountSelector from "../../utils/selectors/questionsToAnswerCountSelector";
import questionSelector from "../../utils/selectors/questionSelector";

/*
If you go open this page and it's already answered -> redirect to answer
*/

const ReviewQuestion: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { questionId }: { questionId: string } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  );
  const dispatch = useDispatch();
  const question = useTypedSelector(questionSelector(questionId));
  const questionsToAnswerCount = useTypedSelector(
    questionsToAnswerCountSelector
  );
  const score = useTypedSelector(scoreSelector);

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
    history.push(`${match.url}/answer`);
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
        {questionsToAnswerCount}{" "}
        {questionsToAnswerCount === 1 ? "question" : "questions"} left
      </p>
      <p>Your score: {score}</p>
      <Button onClick={submitAnswer}>Answer</Button>
    </Layout>
  );
};

export default ReviewQuestion;
