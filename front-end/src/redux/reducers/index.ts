import { combineReducers, Action } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { questionsReducer } from "./questionsReducer";
import { reviewSessionReducer } from "./reviewSessionReducer";


export * from './questionsReducer';
export * from './reviewSessionReducer';

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
