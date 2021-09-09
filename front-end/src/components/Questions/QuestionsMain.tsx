import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import AllQuestions from "./AllQuestions";
import { useTypedSelector } from "../../redux/reducers";
import Button from "../common/Button/Button";
import StyledQuestionsMain from "./QuestionsMainStyle";
import Dropzone from "../common/Dropzone/Dropzone";
import Layout from "../common/Layout/Layout";

const QuestionsMain: React.FC = () => {
  const match = useRouteMatch();
  const questions = useTypedSelector(({ questions }) => questions);

  return (
    <Switch>
      <Route path={`${match.path}/editor`}>
        <AllQuestions />
      </Route>
      <Route path={match.path}>
        <Layout>
          <StyledQuestionsMain>
            <Link to={`${match.url}/editor`} tabIndex={-1}>
              <Button
                backgroundIcon="create"
                width="23rem"
                height="12.4rem"
                fontSize="1.9rem"
                backgroundIconSize="10rem"
              >
                Add/Edit Questions
              </Button>
            </Link>
            <p>
              To make sure you don't lose the questions, you can download and
              upload them back later
            </p>
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
                Download Questions File
              </Button>
            </a>
            <Dropzone />
          </StyledQuestionsMain>
        </Layout>
      </Route>
    </Switch>
  );
};

export default QuestionsMain;
