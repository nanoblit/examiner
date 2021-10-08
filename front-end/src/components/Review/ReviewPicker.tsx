import React from "react";
import { useHistory, useRouteMatch, Switch, Route } from "react-router";

import { useAppDispatch } from "../../redux/hooks";
import Layout from "../common/Layout/Layout";
import Button from "../common/Button/Button";
import { useAppSelector } from "../../redux/hooks";
import { setReviewSession } from "../../redux/slices/reviewSessionSlice";
import getRandomArrayElement from "../../utils/getRandomArrayElement";
import ReviewQuestion from "./ReviewQuestion";
import ReviewAnswer from "./ReviewAnswer";
import ReviewFinalScore from "./ReviewFinalScore";
import useRandomUnansweredQuestion from "../../utils/hooks/useRandomUnansweredQuestion";
import ReviewPickerContainer, { ContinueGroup } from "./ReviewPickerStyle";

// TODO: Make it so it asks to add new questions when there are no questions

const ReviewPicker: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(({ questions }) => questions);
  const unansweredQuestionsCount = useAppSelector(
    ({ questions, reviewSession }) =>
      questions.length - Object.keys(reviewSession).length
  );
  const randomUnansweredQuestion = useRandomUnansweredQuestion();

  const startNewSession = () => {
    // Reset session
    dispatch(setReviewSession({}));
    history.push(`/review/${getRandomArrayElement(questions)?.id ?? ""}`);
  };

  const continueSession = () => {
    history.push(`/review/${randomUnansweredQuestion?.id ?? ""}`);
  };

  return (
    <Switch>
      <Route path={`${match.path}/finalScore`}>
        <ReviewFinalScore />
      </Route>
      <Route path={`${match.path}/:questionId/answer`}>
        <ReviewAnswer />
      </Route>
      <Route path={`${match.path}/:questionId`}>
        <ReviewQuestion />
      </Route>
      <Route path={match.path}>
        <Layout>
          <ReviewPickerContainer>
            <p>What would you like to do?</p>
            <ContinueGroup>
              <Button onClick={startNewSession}>Start a new session</Button>
              <p>All questions: {questions.length}</p>
            </ContinueGroup>
            {unansweredQuestionsCount > 0 &&
              unansweredQuestionsCount !== questions.length && (
                <ContinueGroup>
                  <Button onClick={continueSession}>
                    Continue the last session
                  </Button>
                  <p>Questions to answer: {unansweredQuestionsCount}</p>
                </ContinueGroup>
              )}
          </ReviewPickerContainer>
        </Layout>
      </Route>
    </Switch>
  );
};

export default ReviewPicker;
