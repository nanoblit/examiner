import { isArrayOfType } from "../utils/isArrayOfType";

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswers: number[];
  correctlyAnsweredCount?: number;
  totalAnsweredCount?: number;
  lastAnswered?: boolean;
}

export const isQuestion = (value: Object): value is Question => {
  const typedValue = value as Question;
  return (
    typeof typedValue.id === "string" &&
    typeof (typedValue.question === "string") &&
    isArrayOfType(typedValue.answers, "string") &&
    isArrayOfType(typedValue.correctAnswers, "number")
  );
};
