import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Navbar from "./components/Navbar/Navbar";
import Revision from "./components/Revision/Revision";
import Questions from "./components/Questions/Questions";
import { setQuestionsAction } from "./actions";
import { Question } from "./models/Question";
import { isQuestionsState } from "./actions/types";
import GlobalStyle from "./styles/globalStyles";
import StyledApp from "./AppStyle";
import ReviewSessionTest from "./components/Revision/ReviewSessionTest";
import Layout from "./components/common/Layout/Layout";

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
      <>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/questions">
            <Questions />
          </Route>
          {/* So it can use the questions in store */}
          <Route path="/review">{questionsLoaded && <Revision />}</Route>
          <Route path="/reviewSessionTest">{<ReviewSessionTest />}</Route>
          <Route path="/">
            <Layout>
              <StyledApp>
                <h1>Welcome to Examify!</h1>
                <p>Add some questions, then review them!</p>
              </StyledApp>
            </Layout>
          </Route>
        </Switch>
        <ToastContainer />
      </>
    </>
  );
};

export default App;
