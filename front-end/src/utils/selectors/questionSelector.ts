import { QuestionsState } from "../../redux/actions/types";

const questionSelector =
  (questionId: string) =>
  ({ questions }: { questions: QuestionsState }) =>
    questions.find((q) => q.id === questionId);

export default questionSelector;