import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Revision from "./components/Revision/Revision";
import Questions from "./components/Questions/Questions";
import { setQuestionsAction } from "./actions";
import { Question } from "./models/Question";
import { isQuestionsState } from "./actions/types";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const setQuestionsFromLocalStorage = () => {
    const questions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    ) as Question[];
    isQuestionsState(questions)
      ? dispatch(setQuestionsAction(questions))
      : console.error("Questions in local storage are wrong");
  };

  useEffect(() => {
    setQuestionsFromLocalStorage();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/revision">
          <Revision />
        </Route>
        {/* <Route path="/exam" component={} /> */}
      </Switch>
    </div>
  );
};

export default App;
