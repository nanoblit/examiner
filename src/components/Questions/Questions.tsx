import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import Editor from "./Editor";
import { useTypedSelector } from "../../reducers";
import Button from "../common/Button/Button";
import StyledQuestions from "./QuestionsStyle";
import Dropzone from "../common/Dropzone/Dropzone";


const Questions: React.FC = () => {
  const match = useRouteMatch();
  const questions = useTypedSelector(({ questions }) => questions);

  return (
    <Switch>
      <Route path={`${match.path}/editor`}>
        <Editor />
      </Route>
      <Route path={match.path}>
        <StyledQuestions>
          <Link to={`${match.url}/editor`} tabIndex={-1}>
            <Button
              backgroundIcon="create"
              width="23rem"
              height="12.4rem"
              fontSize="1.9rem"
              backgroundIconSize="10rem"
            >
              Edit Questions
            </Button>
          </Link>
          <Dropzone />
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              JSON.stringify(questions)
            )}`}
            download="questions.json"
          >
            <Button
              backgroundIcon="get_app"
              width="17.5rem"
              height="9.6rem"
              backgroundIconSize="7rem"
            >
              Download Questions
            </Button>
          </a>
        </StyledQuestions>
      </Route>
    </Switch>
  );
};

export default Questions;
