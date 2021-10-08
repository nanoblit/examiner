import React from "react";
import { useHistory } from "react-router";

import { useAppDispatch } from "../../redux/hooks";
import Layout from "../common/Layout/Layout";
import { useAppSelector } from "../../redux/hooks";
import scoreSelector from "../../utils/selectors/scoreSelector";
import Button from "../common/Button/Button";
import { setReviewSession } from "../../redux/slices/reviewSessionSlice";
import getRandomArrayElement from "../../utils/getRandomArrayElement";
import FinalScoreContainer from "./ReviewFinalScoreStyle";

const ReviewFinalScore: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(({ questions }) => questions);
  const score = useAppSelector(scoreSelector);

  const tryAgain = () => {
    // Reset session
    dispatch(setReviewSession({}));
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
