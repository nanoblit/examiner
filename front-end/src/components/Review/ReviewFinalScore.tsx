import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Layout from "../common/Layout/Layout";
import { useTypedSelector } from "../../redux/reducers";
import scoreSelector from "../../utils/selectors/scoreSelector";
import Button from "../common/Button/Button";
import { setReviewSessionAction } from "../../redux/actions";
import getRandomArrayElement from "../../utils/getRandomArrayElement";
import FinalScoreContainer from "./ReviewFinalScoreStyle";

const ReviewFinalScore: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useTypedSelector(({ questions }) => questions);
  const score = useTypedSelector(scoreSelector);

  const tryAgain = () => {
    // Reset session
    dispatch(setReviewSessionAction({}));
    history.push(`/review/${getRandomArrayElement(questions)?.id ?? ""}`);
  };

  return (
    <Layout>
      <FinalScoreContainer>
        <p>Score: {score}</p>
        <Button onClick={tryAgain}>Try Again</Button>
      </FinalScoreContainer>
    </Layout>
  );
};

export default ReviewFinalScore;
