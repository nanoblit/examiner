import { ThunkDispatch } from "redux-thunk";

import { ReviewSessionData } from "../../models/ReviewSessionData";
import { AppThunk } from "../reducers";
import { AddOrEditReviewSessionItemAction, ADD_OR_EDIT_REVIEW_SESSION_ITEM, DeleteReviewSessionItemAction, DELETE_REVIEW_SESSION_ITEM, ReviewSessionState, SetReviewSessionAction, SET_REVIEW_SESSION } from "./types";


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