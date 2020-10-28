import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import EditQuestion from "./EditQuestion";
import AddQuestion from "./AddQuestion";

const Editor: React.FC = () => {
  const match = useRouteMatch();

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
          <input placeholder="Search" />
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
