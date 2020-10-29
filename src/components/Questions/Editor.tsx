import React, { useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditQuestion from "./EditQuestion";
import AddQuestion from "./AddQuestion";

import { useTypedSelector } from "../../reducers";

const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const [visibleQuestionIds, setVisibleQuestionsIds] = useState(
    new Set<string>()
  );
  const questions = useTypedSelector((state) => state.questions.questions);
  const match = useRouteMatch();

  const updateSearch = (text: string) => {
    setSearch(() => text);
  };

  // Change to debounce later
  const tempHandleSearchKeyDown = (key: string) => {
    if (key === "Enter") {
      refreshVisibleQuestions();
    }
  };

  const refreshVisibleQuestions = () => {
    setVisibleQuestionsIds(
      () =>
        new Set(
          questions
            .filter(({ question }) => question.indexOf(search) >= 0)
            .map(({ id }) => id)
        )
    );
  };

  return (
    <Switch>
      <Route path={`${match.path}/addQuestion`}>
        <AddQuestion />
      </Route>
      <Route path={`${match.path}/:questionId`}>
        <EditQuestion />
      </Route>
      <Route path={match.path}>
        <div>
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            onKeyDown={(e) => tempHandleSearchKeyDown(e.key)}
          />
          <Link to={`${match.url}/addQuestion`}>
            <button>Add New Question</button>
          </Link>
          <Link to={`${match.url}/1`}>
            <p>Question 1</p>
          </Link>
          <Link to={`${match.url}/2`}>
            <p>Question 2</p>
          </Link>
          <Link to={`${match.url}/3`}>
            <p>Question 3</p>
          </Link>
          <Link to={`${match.url}/4`}>
            <p>Question 4</p>
          </Link>
        </div>
      </Route>
    </Switch>
  );
};

export default Editor;
