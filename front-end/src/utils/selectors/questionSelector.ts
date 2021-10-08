import { QuestionsState } from "../../redux/slices/questionsSlice";

const questionSelector =
  (questionId: string) =>
  ({ questions }: { questions: QuestionsState }) =>
    questions.find((q) => q.id === questionId);

export default questionSelector;