import { Question } from "../models/Question";

export const CURRENT_VERSION = 1;

export interface QuestionsState {
  version: number;
  questions: Question[];
}

export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";

export interface AddQuestionAction {
  type: typeof ADD_QUESTION;
  payload: Question;
}

export interface EditQuestionAction {
  type: typeof EDIT_QUESTION;
  payload: Question;
}

export type QuestionActionTypes = AddQuestionAction | EditQuestionAction;