import React from "react";
import { useParams, useHistory, Redirect } from "react-router";

import Layout from "../common/Layout/Layout";
import QuestionField from "../common/QuestionField/QuestionField";
import AnswerField, {
  AnswerFieldType,
} from "../common/AnswerField/AnswerField";
import Button from "../common/Button/Button";
import { useTypedSelector } from "../../redux/reducers";
import questionSelector from "../../utils/selectors/questionSelector";
import pickedAnswersSelector from "../../utils/selectors/pickedAnswersSelector";
import questionsToAnswerCountSelector from "../../utils/selectors/questionsToAnswerCountSelector";
import scoreSelector from "../../utils/selectors/scoreSelector";
import useRandomUnansweredQuestion from "../../utils/hooks/useRandomUnansweredQuestion";
import StyledAnswerContent, { ReviewAnswerButtons } from "./ReviewAnswerStyle";


const ReviewAnswer: React.FC = () => {
  const history = useHistory();
  const { questionId }: { questionId: string } = useParams();
  const questions = useTypedSelector(({ questions }) => questions);
  const question = useTypedSelector(questionSelector(questionId));
  const pickedAnswers = useTypedSelector(pickedAnswersSelector(questionId));
  const questionsToAnswerCount = useTypedSelector(
    questionsToAnswerCountSelector
  );
  const randomUnansweredQuestion = useRandomUnansweredQuestion();
  const score = useTypedSelector(scoreSelector);

  const isChecked = (answerIdx: number) =>
    pickedAnswers.indexOf(answerIdx) >= 0;

  const isAnswerCorrect = (answerIdx: number) =>
    question?.correctAnswers.find((correctIdx) => correctIdx === answerIdx) !==
    undefined;

  const nextQuestion = () =>
    history.push(
      `/review/${
        randomUnansweredQuestion?.id ?? ""
      }`
    );

  const finishAnswering = () => history.push("/review/finalScore");

  if (!questions.some((q) => q.id === questionId)) {
    return <Redirect to="/review" />;
  }

  return (
    <Layout>
      <StyledAnswerContent>
        <QuestionField text={question?.question} readonly />
        <p>The highlighted answers are correct</p>
        {question?.answers.map((answer, idx) => (
          <AnswerField
            key={idx}
            type={AnswerFieldType.Answer}
            text={answer}
            defaultChecked={isChecked(idx)}
            isHighlighted={isAnswerCorrect(idx)}
            isChecked={isChecked(idx)}
          />
        ))}
        {!question?.explanation || (
          <QuestionField text={question.explanation} readonly />
        )}
        <p>
          {questionsToAnswerCount}{" "}
          {questionsToAnswerCount === 1 ? "question" : "questions"} left
        </p>
        <p>Your score: {score}</p>
        <ReviewAnswerButtons>
          {questionsToAnswerCount > 0 && (
            <Button onClick={nextQuestion}>Next Question</Button> 
          )}
          <Button onClick={finishAnswering} color="danger">
            Finish
          </Button>
        </ReviewAnswerButtons>
      </StyledAnswerContent>
    </Layout>
  );
};

export default ReviewAnswer;
