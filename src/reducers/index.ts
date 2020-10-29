import {
  QuestionsState,
  AddQuestionAction,
  ADD_QUESTION,
  CURRENT_VERSION,
} from "../actions/types";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const defaultQuestionsState: QuestionsState = {
  version: CURRENT_VERSION,
  questions: [],
};

export const questionsReducer = (
  state = defaultQuestionsState,
  action: AddQuestionAction
): QuestionsState => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
