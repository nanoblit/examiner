import { Question } from "../models/Question";
import {
  AddQuestionAction,
  ADD_QUESTION,
  EditQuestionAction,
  EDIT_QUESTION,
  QuestionsState,
  SetQuestionAction,
  SET_QUESTIONS,
  DeleteQuestionAction,
  DELETE_QUESTION,
  AddOrEditReviewSessionItemAction,
  ADD_OR_EDIT_REVIEW_SESSION_ITEM,
  DeleteReviewSessionItemAction,
  DELETE_REVIEW_SESSION_ITEM,
  ReviewSessionState,
  SetReviewSessionAction,
  SET_REVIEW_SESSION,
} from "./types";
import { AppThunk } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { ReviewSessionData } from "../models/ReviewSessionData";

/////////////////// Question Actions ///////////////////

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

/////////////////// Session Actions ///////////////////

export const addOrEditReviewSessionItemAction = (id: string, data: ReviewSessionData): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, AddOrEditReviewSessionItemAction>,
  getState
) => {
  dispatch({
    type: ADD_OR_EDIT_REVIEW_SESSION_ITEM,
    payload: {id, data},
  });

  localStorage.setItem("reviewSession", JSON.stringify(getState().reviewSession));
};

export const deleteReviewSessionItemAction = (id: string): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, DeleteReviewSessionItemAction>,
  getState
) => {
  dispatch({
    type: DELETE_REVIEW_SESSION_ITEM,
    payload: id,
  });

  localStorage.setItem("reviewSession", JSON.stringify(getState().reviewSession));
};

export const setReviewSessionAction = (state: ReviewSessionState): AppThunk => (
  dispatch: ThunkDispatch<{}, {}, SetReviewSessionAction>,
  getState
) => {
  dispatch({
    type: SET_REVIEW_SESSION,
    payload: state,
  });

  localStorage.setItem("reviewSession", JSON.stringify(getState().reviewSession));
};