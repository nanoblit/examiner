import { QuestionsState, QuestionActionTypes, ADD_QUESTION, DELETE_QUESTION, EDIT_QUESTION, SET_QUESTIONS } from "../actions/types";


const defaultQuestionsState: QuestionsState = [];

export const questionsReducer = (
  state = defaultQuestionsState,
  action: QuestionActionTypes
): QuestionsState => {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, action.payload];
    case DELETE_QUESTION:
      return state.filter((question) => question.id !== action.payload);
    case EDIT_QUESTION:
      return state.map((question) =>
        question.id === action.payload.id ? action.payload : question
      );
    case SET_QUESTIONS:
      return action.payload;
    default:
      return state;
  }
};