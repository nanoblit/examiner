import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ReviewSessionData } from "../../models/ReviewSessionData";

export type ReviewSessionState = { [id: string]: ReviewSessionData };

const initialState: ReviewSessionState = {};

export const reviewSessionSlice = createSlice({
  name: "reviewSession",
  initialState,
  reducers: {
    addOrEditReviewSessionItem: (
      state,
      action: PayloadAction<{ id: string; data: ReviewSessionData }>
    ) => {
      state = { ...state, [action.payload.id]: action.payload.data };

      localStorage.setItem(
        "reviewSession",
        JSON.stringify(state)
      );
      return state;
    },
    deleteReviewSessionItem: (state, action: PayloadAction<string>) => {
      state = Object.keys(state).reduce((acc, s) => {
        return s === action.payload ? acc : { ...acc, [s]: state[s] };
      }, {} as ReviewSessionState);

      localStorage.setItem(
        "reviewSession",
        JSON.stringify(state)
      );
      return state;
    },
    setReviewSession: (state, action: PayloadAction<ReviewSessionState>) => {
      state = action.payload;

      localStorage.setItem(
        "reviewSession",
        JSON.stringify(state)
      );
      return state;
    },
  },
});

export const {
  addOrEditReviewSessionItem,
  deleteReviewSessionItem,
  setReviewSession,
} = reviewSessionSlice.actions;

export default reviewSessionSlice.reducer;
