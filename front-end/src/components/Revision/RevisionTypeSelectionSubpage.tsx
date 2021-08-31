import React from "react";

import { RevisionType } from "./Revision";
import Button from "../common/Button/Button";
import StyledRevisionTypeSelectionSubpage from "./RevisionTypeSelectionSubpageStyle";

type props = {
  setRevisionType: React.Dispatch<React.SetStateAction<RevisionType>>;
  allQuestions: number;
  unansweredQuestions: number;
  incorrectAndUnansweredQuestions: number;
};

const RevisionTypeSelectionSubpage: React.FC<props> = ({
  setRevisionType,
  allQuestions,
  unansweredQuestions,
  incorrectAndUnansweredQuestions,
}) => {
  // Add a generic search bar for questions to pick which questions to include (how?)
  return (
    <StyledRevisionTypeSelectionSubpage>
      <p>What would you like to do?</p>
      <div className="continueGroup">
        <Button onClick={() => setRevisionType(() => RevisionType.NewSession)}>
          Start a new session
        </Button>
        <p>All questions: {allQuestions}</p>
      </div>
      <div className="continueGroup">
        <Button
          onClick={() =>
            setRevisionType(() => RevisionType.ContinueLastSession)
          }
        >
          Continue the last session
        </Button>
        <p>Questions to answer: {unansweredQuestions}</p>
      </div>
      <div className="continueGroup">
        <Button
          onClick={() =>
            setRevisionType(() => RevisionType.IncorrectAndUnansweredQuestions)
          }
        >
          Continue with incorrectly answered and unanswered questions
        </Button>
        <p>Questions to answer: {incorrectAndUnansweredQuestions}</p>
      </div>
    </StyledRevisionTypeSelectionSubpage>
  );
};

export default RevisionTypeSelectionSubpage;
