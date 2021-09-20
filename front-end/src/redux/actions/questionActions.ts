
import { ThunkDispatch } from "redux-thunk";

import { Question } from "../../models/Question";
import { AppThunk } from "../reducers";
import { AddQuestionAction, ADD_QUESTION, DeleteQuestionAction, DELETE_QUESTION, EditQuestionAction, EDIT_QUESTION, QuestionsState, SetQuestionAction, SET_QUESTIONS } from "./types";


export const addQuestionAction = (question: Question): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, AddQuestionAction>,
  getState
) => {
  dispatch({
    type: ADD_QUESTION,
    payload: question,
  });

  localStorage.setItem("questions", JSON.stringify(getState().questions));
};

export const deleteQuestionAction = (id: string): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, DeleteQuestionAction>,
  getState
) => {
  dispatch({
    type: DELETE_QUESTION,
    payload: id,
  });

  localStorage.setItem("questions", JSON.stringify(getState().questions));
};

export const editQuestionAction = (question: Question): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, EditQuestionAction>,
  getState
) => {
  dispatch({
    type: EDIT_QUESTION,
    payload: question,
  });

  localStorage.setItem("questions", JSON.stringify(getState().questions));
};

export const setQuestionsAction = (
  questionsState: QuestionsState
): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, SetQuestionAction>,
  getState
) => {
  dispatch({
    type: SET_QUESTIONS,
    payload: questionsState,
  });

  localStorage.setItem("questions", JSON.stringify(getState().questions));
};