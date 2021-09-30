import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Question } from "../../models/Question";

export type QuestionsState = Question[];

const initialState: QuestionsState = [];

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.push(action.payload);

      localStorage.setItem("questions", JSON.stringify(state));
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state = state.filter((question) => question.id !== action.payload);

      localStorage.setItem("questions", JSON.stringify(state));
    },
    editQuestion: (state, action: PayloadAction<Question>) => {
      state = state.map((question) =>
        question.id === action.payload.id ? action.payload : question
      );

      localStorage.setItem("questions", JSON.stringify(state));
    },
    setQuestions: (state, action: PayloadAction<QuestionsState>) => {
      state = action.payload;

      localStorage.setItem("questions", JSON.stringify(state));
    },
  },
});

export const { addQuestion, deleteQuestion, editQuestion, setQuestions } =
  questionSlice.actions;

export default questionSlice.reducer;