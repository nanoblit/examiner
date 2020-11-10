import { Question } from "../models/Question";
import {
  AddQuestionAction,
  ADD_QUESTION,
  EditQuestionAction,
  EDIT_QUESTION,
} from "./types";

export const addQuestionAction = (question: Question): AddQuestionAction => {
  return {
    type: ADD_QUESTION,
    payload: question,
  };
};

export const editQuestionAction = (question: Question): EditQuestionAction => {
  return {
    type: EDIT_QUESTION,
    payload: question,
  };
};
