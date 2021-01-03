import React, { useState, useEffect } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditQuestion from "./EditQuestion";

import { useTypedSelector } from "../../reducers";
import QuestionListElement from "../common/QuestionListElement/QuestionListElement";
import StyledDiv from "./EditorStyle";
import Button from "../common/Button/Button";
import SearchBar from "../common/SearchBar/SearchBar";

const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const match = useRouteMatch();

  const questions = useTypedSelector(({ questions }) =>
    questions
      .filter(
        ({ question }) =>
          question.toLowerCase().indexOf(search.toLowerCase()) >= 0
      )
      .sort((a, b) => (a.question.toLowerCase() < b.question.toLowerCase() ? -1 : 1))
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
        <StyledDiv>
          <SearchBar
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />
          <Link to={`${match.url}/addQuestion`}>
            <Button
              backgroundIcon="add"
              width="17.5rem"
              height="9.6rem"
              backgroundIconSize="7rem"
            >
              Add New Question
            </Button>
          </Link>
          {questions.map(({ question, id }) => (
            <Link className="questionLink" key={id} to={`${match.url}/${id}`}>
              <QuestionListElement>{question}</QuestionListElement>
            </Link>
          ))}
        </StyledDiv>
      </Route>
    </Switch>
  );
};

export default Editor;
