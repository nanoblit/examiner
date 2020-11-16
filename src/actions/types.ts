import { Question, isQuestion } from "../models/Question";
import { isArrayOfType } from "../utils/isArrayOfType";

export const CURRENT_VERSION = 1;

export interface QuestionsState {
  version: number;
  questions: Question[];
}

export const isQuestionsState = (value: Object): value is QuestionsState => {
  const typedValue = value as QuestionsState;
  if (typeof(typedValue.version) === 'number' && isArrayOfType(typedValue.questions, isQuestion)) {
    return true;
  }
  return false
}

export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const SET_QUESTIONS = "SET_QUESTIONS";

export interface AddQuestionAction {
  type: typeof ADD_QUESTION;
  payload: Question;
}

export interface EditQuestionAction {
  type: typeof EDIT_QUESTION;
  payload: Question;
}

export interface SetQuestionAction {
  type: typeof SET_QUESTIONS;
  payload: QuestionsState;
}

export type QuestionActionTypes = AddQuestionAction | EditQuestionAction | SetQuestionAction;