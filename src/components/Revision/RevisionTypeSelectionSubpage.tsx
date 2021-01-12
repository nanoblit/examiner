import React from "react";

import { RevisionType } from "./Revision";
import Button from "../common/Button/Button";
import StyledDiv from "./RevisionTypeSelectionSubpageStyle";


type props = {
  setRevisionType: React.Dispatch<React.SetStateAction<RevisionType>>;
};

const RevisionTypeSelectionSubpage: React.FC<props> = ({ setRevisionType }) => {
  // Add a generic search bar for questions to pick which questions to include (how?)
  return (
    <StyledDiv>
      <p>What would you like to do?</p>
      <Button onClick={() => setRevisionType(() => RevisionType.NewSession)}>
        Start a new session
      </Button>
      <Button
        onClick={() => setRevisionType(() => RevisionType.ContinueLastSession)}
      >
        Continue the last session
      </Button>
      <Button
        onClick={() =>
          setRevisionType(() => RevisionType.IncorrectAndUnansweredQuestions)
        }
      >
        Continue the last session with incorrectly answered questions
      </Button>
    </StyledDiv>
  );
};

export default RevisionTypeSelectionSubpage;
