import {
  QuestionsState,
  ADD_QUESTION,
  CURRENT_VERSION,
  QuestionActionTypes,
  EDIT_QUESTION,
  SET_QUESTIONS,
} from "../actions/types";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const defaultQuestionsState: QuestionsState = {
  version: CURRENT_VERSION,
  questions: [],
};

export const questionsReducer = (
  state = defaultQuestionsState,
  action: QuestionActionTypes
): QuestionsState => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };
    case EDIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload : question
        ),
      };
    case SET_QUESTIONS:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
