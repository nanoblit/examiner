import { ReviewSessionState } from "../../redux/actions/types";

const pickedAnswersSelector =
  (questionId: string) =>
  ({ reviewSession }: { reviewSession: ReviewSessionState }) =>
    reviewSession[questionId].givenAnswers;

export default pickedAnswersSelector;
