import React, { useEffect, } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useAppDispatch } from "./redux/hooks";
import QuestionsMain from "./components/Questions/QuestionsMain";
import { setQuestions } from "./redux/slices/questionsSlice";
import { ReviewSessionState, setReviewSession } from "./redux/slices/reviewSessionSlice";
import { Question } from "./models/Question";
import GlobalStyle from "./styles/globalStyles";
import StyledApp from "./AppStyle";
import Layout from "./components/common/Layout/Layout";
import ReviewPicker from "./components/Review/ReviewPicker";

// TODO: Add ThemeProvider and a theme

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const setQuestionsFromLocalStorage = () => {
    const questions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    ) as Question[];
    dispatch(setQuestions(questions))
  };

  const setReviewSessionFromLocalStorage = () => {
    const session = JSON.parse(
      localStorage.getItem("reviewSession") || "{}"
    ) as ReviewSessionState;
    dispatch(setReviewSession(session));
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
          <Route path="/review">
            <ReviewPicker />
          </Route>
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
