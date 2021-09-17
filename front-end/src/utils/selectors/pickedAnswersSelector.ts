import { ReviewSessionState } from "../../redux/actions/types";

const pickedAnswersSelector =
  (questionId: string) =>
  ({ reviewSession }: { reviewSession: ReviewSessionState }) => {
    if (Object.keys(reviewSession).indexOf(questionId) < 0) {
      return [];
    }
    return reviewSession[questionId].givenAnswers;
  };
export default pickedAnswersSelector;
