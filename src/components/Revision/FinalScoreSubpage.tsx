import React from "react";
import { QuestionsState } from "../../actions/types";

type props = {
  tryAgain: () => void;
  questions: QuestionsState;
  score: string;
};

const FinalScoreSubpage: React.FC<props> = ({
  tryAgain,
  questions,
  score,
}) => {
  return (
    <>
      <p>
        Final score: {score}
      </p>
      {questions.length > 0 && <button onClick={tryAgain}>TryAgain</button>}
    </>
  );
};

export default FinalScoreSubpage;
