import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch, Switch, Route } from "react-router";

import Layout from "../common/Layout/Layout";
import Button from "../common/Button/Button";
import { useTypedSelector } from "../../redux/reducers";
import { setReviewSessionAction } from "../../redux/actions";
import getRandomArrayElement from "../../utils/getRandomArrayElement";
import getRandomUnansweredQuestion from "../../utils/getRandomUnansweredQuestion";
import ReviewQuestion from "./ReviewQuestion";
import ReviewAnswer from "./ReviewAnswer";

/*
Show all questions number when all questions have been answered
Hide continue session if there is no session to continue or if all questions have been answered
Make unansweredQuestionsCount a custom, reusabe hook
*/

const ReviewPicker: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useTypedSelector(({ questions }) => questions);
  const reviewSession = useTypedSelector(({ reviewSession }) => reviewSession);
  const unansweredQuestionsCount = useTypedSelector(
    ({ questions, reviewSession }) =>
      questions.length - Object.keys(reviewSession).length
  );

  const startNewSession = () => {
    // Reset session
    dispatch(setReviewSessionAction({}));
    history.push(`/review/${getRandomArrayElement(questions)?.id ?? ""}`);
  };

  const continueSession = () => {
    history.push(
      `/review/${
        getRandomUnansweredQuestion(questions, reviewSession)?.id ?? ""
      }`
    );
  };

  return (
    <Switch>
      <Route path={`${match.path}/:questionId/answer`}>
        <ReviewAnswer />
      </Route>
      <Route path={`${match.path}/:questionId`}>
        <ReviewQuestion />
      </Route>
      <Route path={match.path}>
        <Layout>
          <p>What would you like to do?</p>
          <div className="continueGroup">
            <Button onClick={startNewSession}>Start a new session</Button>
            <p>All questions: {questions.length}</p>
          </div>
          <div className="continueGroup">
            <Button onClick={continueSession}>Continue the last session</Button>
            <p>Questions to answer: {unansweredQuestionsCount}</p>
          </div>
        </Layout>
      </Route>
    </Switch>
  );
};

export default ReviewPicker;
