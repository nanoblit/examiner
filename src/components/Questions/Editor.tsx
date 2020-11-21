import React, { useState, useEffect } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditQuestion from "./EditQuestion";

import { useTypedSelector } from "../../reducers";

const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const match = useRouteMatch();

  const questions = useTypedSelector(({ questions }) =>
    questions
      .filter(
        ({ question }) =>
          question.toLowerCase().indexOf(search.toLowerCase()) >= 0
      )
      .sort((a, b) => (a.question < b.question ? -1 : 1))
  );

  const updateSearch = (text: string) => {
    setSearch(() => text);
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
          />
          <Link to={`${match.url}/addQuestion`}>
            <button>Add New Question</button>
          </Link>
          {questions.map(({ question, id }) => (
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
