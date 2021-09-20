import { ReviewSessionState, ReviewSessionActionTypes, ADD_OR_EDIT_REVIEW_SESSION_ITEM, DELETE_REVIEW_SESSION_ITEM, SET_REVIEW_SESSION } from "../actions/types";


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
        return s === action.payload ? acc : { ...acc, [s]: state[s] };
      }, {} as ReviewSessionState);
    case SET_REVIEW_SESSION:
      return action.payload;
    default:
      return state;
  }
};
