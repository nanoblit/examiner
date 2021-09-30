import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import questionsReducer from "./slices/questionsSlice";
import reviewSessionReducer from "./slices/reviewSessionSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    reviewSession: reviewSessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
