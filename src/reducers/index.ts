import {
  QuestionsState,
  ADD_QUESTION,
  CURRENT_VERSION,
  QuestionActionTypes,
  EDIT_QUESTION,
  SET_QUESTIONS,
} from "../actions/types";
import { combineReducers, Action } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";

const defaultQuestionsState: QuestionsState = [];

export const questionsReducer = (
  state = defaultQuestionsState,
  action: QuestionActionTypes
): QuestionsState => {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, action.payload];
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

export const rootReducer = combineReducers({
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
