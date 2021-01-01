import React from "react";

import { RevisionType } from "./Revision";


type props = {
  setRevisionType: React.Dispatch<React.SetStateAction<RevisionType>>;
};

const RevisionTypeSelectionSubpage: React.FC<props> = ({ setRevisionType }) => {
  // Add a generic search bar for questions to pick which questions to include (how?)
  return (
    <>
      <p>What do you want to do?</p>
      <button onClick={() => setRevisionType(() => RevisionType.NewSession)}>
        start a new session
      </button>
      <button
        onClick={() => setRevisionType(() => RevisionType.ContinueLastSession)}
      >
        continue last session
      </button>
      <button
        onClick={() =>
          setRevisionType(() => RevisionType.IncorrectAndUnansweredQuestions)
        }
      >
        answer incorrect and unanswered questions
      </button>
    </>
  );
};

export default RevisionTypeSelectionSubpage;
