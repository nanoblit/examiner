import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Revision from "./components/Revision/Revision";
import Questions from "./components/Questions/Questions";
import { setQuestionsAction } from "./actions";
import { Question } from "./models/Question";
import { isQuestionsState } from "./actions/types";
import GlobalStyle from "./styles/globalStyles";
import StyledContent from "./AppStyle";

const App: React.FC = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const dispatch = useDispatch();

  const setQuestionsFromLocalStorage = () => {
    const questions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    ) as Question[];
    isQuestionsState(questions)
      ? dispatch(setQuestionsAction(questions))
      : console.error("Questions in local storage are wrong");

    setQuestionsLoaded(() => true);
  };

  useEffect(() => {
    setQuestionsFromLocalStorage();
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Navbar />
        <StyledContent>
          <Switch>
            <Route path="/questions">
              <Questions />
            </Route>
            {/* So it can use the questions in store */}
            <Route path="/revision">
              {questionsLoaded && <Revision />}
            </Route>{" "}
          </Switch>
        </StyledContent>
      </div>
    </>
  );
};

export default App;
