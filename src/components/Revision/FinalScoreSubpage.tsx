import React from "react";

import { QuestionsState } from "../../actions/types";
import StyledDiv from "./FinalScoreSubpageStyle";
import Button from "../common/Button/Button";

type props = {
  tryAgain: () => void;
  questions: QuestionsState;
  score: string;
  percentScore: string;
};

const FinalScoreSubpage: React.FC<props> = ({
  tryAgain,
  questions,
  score,
  percentScore,
}) => {
  return (
    <StyledDiv>
      {score === "0/0" ? (
        <>
          <p>No questions to ask</p>
        </>
      ) : (
        <>
          <p className="finalScore">{percentScore}</p>
          <p className="answeredQuestions">Answered questions: {score}</p>
        </>
      )}
      {questions.length > 0 && <Button onClick={tryAgain}>Try Again</Button>}
    </StyledDiv>
  );
};

export default FinalScoreSubpage;
