import {
  QuestionsState,
  ADD_QUESTION,
  QuestionActionTypes,
  EDIT_QUESTION,
  SET_QUESTIONS,
  DELETE_QUESTION,
  ReviewSessionState,
  ReviewSessionActionTypes,
  ADD_OR_EDIT_REVIEW_SESSION_ITEM,
  DELETE_REVIEW_SESSION_ITEM,
  SET_REVIEW_SESSION,
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

const defaultReviewSessionState: ReviewSessionState = {};

export const reviewSessionReducer = (
  state = defaultReviewSessionState,
  action: ReviewSessionActionTypes
): ReviewSessionState => {
  switch (action.type) {
    case ADD_OR_EDIT_REVIEW_SESSION_ITEM:
      return { ...state, [action.payload.id]: action.payload.data };
    case DELETE_REVIEW_SESSION_ITEM:
      return Object.keys(state).reduce((acc, s) => {
        return s === action.payload ? acc : { ...acc, [s]: state.s };
      }, {} as ReviewSessionState);
    case SET_REVIEW_SESSION:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  questions: questionsReducer,
  reviewSession: reviewSessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
