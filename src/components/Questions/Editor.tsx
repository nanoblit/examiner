import React, { useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditQuestion from "./EditQuestion";

import { useTypedSelector } from "../../reducers";
import { CombinedState } from "redux";
import { QuestionsState } from "../../actions/types";
import { Question } from "../../models/Question";

const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
  const match = useRouteMatch();

  const getVisibleQuestions = (
    state: CombinedState<{
      questions: QuestionsState;
    }>
  ) =>
    state.questions
      .filter(
        ({ question }) =>
          question.toLowerCase().indexOf(search.toLowerCase()) >= 0
      )
      .sort((a, b) => (a.question < b.question ? -1 : 1));

  const questions = useTypedSelector(getVisibleQuestions);

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
    setVisibleQuestions(() => questions);
  };

  return (
    <Switch>
      <Route path={`${match.path}/addQuestion`}>
        <EditQuestion />
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
          {visibleQuestions.map(({ question, id }) => (
            <Link key={id} to={`${match.url}/${id}`}>
              <p>{question}</p>
            </Link>
          ))}
        </div>
      </Route>
    </Switch>
  );
};

export default Editor;
