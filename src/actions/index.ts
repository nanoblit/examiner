import { Question } from "../models/Question";
import { AddQuestionAction, ADD_QUESTION } from "./types";

export const addQuestionAction = (question: Question): AddQuestionAction => {
  return {
    type: ADD_QUESTION,
    payload: question,
  };
};
