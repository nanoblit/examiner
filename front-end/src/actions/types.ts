import { Question, isQuestion } from "../models/Question";
import { isArrayOfType } from "../utils/isArrayOfType";
import { ReviewSessionData } from "../models/ReviewSessionData";

export const CURRENT_VERSION = 1;

/////////////////// Question State ///////////////////

export type QuestionsState = Question[];

export const isQuestionsState = (value: Object): value is QuestionsState => {
  const typedValue = value as QuestionsState;
  if (isArrayOfType(typedValue, isQuestion)) {
    return true;
  }
  return false;
};

export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const SET_QUESTIONS = "SET_QUESTIONS";

export interface AddQuestionAction {
  type: typeof ADD_QUESTION;
  payload: Question;
}

export interface DeleteQuestionAction {
  type: typeof DELETE_QUESTION;
  payload: string;
}

export interface EditQuestionAction {
  type: typeof EDIT_QUESTION;
  payload: Question;
}

export interface SetQuestionAction {
  type: typeof SET_QUESTIONS;
  payload: QuestionsState;
}

export type QuestionActionTypes =
  | AddQuestionAction
  | DeleteQuestionAction
  | EditQuestionAction
  | SetQuestionAction;

/////////////////// Session State ///////////////////

export type ReviewSessionState = { [id: string]: ReviewSessionData };

export const ADD_OR_EDIT_REVIEW_SESSION_ITEM = "ADD_OR_EDIT_REVIEW_SESSION_ITEM";
export const DELETE_REVIEW_SESSION_ITEM = "DELETE_REVIEW_SESSION_ITEM";
export const SET_REVIEW_SESSION = "SET_REVIEW_SESSION";

export interface AddOrEditReviewSessionItemAction {
  type: typeof ADD_OR_EDIT_REVIEW_SESSION_ITEM;
  payload: { id: string; data: ReviewSessionData };
}

export interface DeleteReviewSessionItemAction {
  type: typeof DELETE_REVIEW_SESSION_ITEM;
  payload: string;
}

export interface SetReviewSessionAction {
  type: typeof SET_REVIEW_SESSION;
  payload: ReviewSessionState;
}

export type ReviewSessionActionTypes =
  | AddOrEditReviewSessionItemAction
  | DeleteReviewSessionItemAction
  | SetReviewSessionAction;
