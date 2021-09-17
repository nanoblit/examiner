import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import QuestionsMain from "./components/Questions/QuestionsMain";
import { setQuestionsAction, setReviewSessionAction } from "./redux/actions";
import { Question } from "./models/Question";
import { isQuestionsState, ReviewSessionState } from "./redux/actions/types";
import GlobalStyle from "./styles/globalStyles";
import StyledApp from "./AppStyle";
import ReviewSessionTest from "./components/Revision/ReviewSessionTest";
import Layout from "./components/common/Layout/Layout";
import ReviewPicker from "./components/Review/ReviewPicker";

// TODO: Make isReviewSessionState and use it

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

  const setReviewSessionFromLocalStorage = () => {
    const session = JSON.parse(
      localStorage.getItem("reviewSession") || "{}"
    ) as ReviewSessionState;
    dispatch(setReviewSessionAction(session));
  };

  useEffect(() => {
    setQuestionsFromLocalStorage();
    setReviewSessionFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <>
        <Switch>
          <Route path="/questions">
            <QuestionsMain />
          </Route>
          {/* So it can use the questions in store */}
          <Route path="/review">{questionsLoaded && <ReviewPicker />}</Route>
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
