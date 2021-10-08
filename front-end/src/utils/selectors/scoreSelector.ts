import { QuestionsState } from "../../redux/slices/questionsSlice";
import { ReviewSessionState } from "../../redux/slices/reviewSessionSlice";

const scoreSelector = ({
  questions,
  reviewSession,
}: {
  questions: QuestionsState;
  reviewSession: ReviewSessionState;
}) => {
  let s = 0;
  for (const reviewedId in reviewSession) {
    const givenAnswers = reviewSession[reviewedId].givenAnswers;
    const correctAnswers =
      questions.find((q) => q.id === reviewedId)?.correctAnswers ?? [];

    if (
      JSON.stringify(givenAnswers.sort()) ===
      JSON.stringify(correctAnswers.sort())
    ) {
      s++;
    }
  }
  return `${(s / questions.length) * 100}%`;
};

export default scoreSelector;