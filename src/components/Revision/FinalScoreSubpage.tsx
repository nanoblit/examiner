import React from "react";

import { QuestionsState } from "../../actions/types";
import StyledFinalScoreSubpage from "./FinalScoreSubpageStyle";
import Button from "../common/Button/Button";

type Props = {
  tryAgain: () => void;
  questions: QuestionsState;
  score: string;
  percentScore: string;
};

const FinalScoreSubpage: React.FC<Props> = ({
  tryAgain,
  questions,
  score,
  percentScore,
}) => {
  return (
    <StyledFinalScoreSubpage>
      {score === "0/0" ? (
        <>
          <p>No questions to ask</p>
        </>
      ) : (
        <>
          <p className="finalScore">{percentScore}</p>
          <p className="answeredQuestions">Score: {score}</p>
        </>
      )}
      {questions.length > 0 && <Button onClick={tryAgain}>Try Again</Button>}
    </StyledFinalScoreSubpage>
  );
};

export default FinalScoreSubpage;
