import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import Editor from "./Editor";
import { Link } from "react-router-dom";

const Questions: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/editor`}>
        <Editor />
      </Route>
      <Route path={match.path}>
        <Link to={`${match.url}/editor`}>Edit Questions</Link>
        <br/>
        Upload Questions
        <br/>
        Download Questions
      </Route>
    </Switch>
  );
};

export default Questions;
