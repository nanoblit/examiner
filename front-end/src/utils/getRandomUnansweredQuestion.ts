import { QuestionsState } from "../redux/slices/questionsSlice";
import { ReviewSessionState } from "../redux/slices/reviewSessionSlice";
import getRandomArrayElement from "./getRandomArrayElement";

const getRandomUnansweredQuestion = (
  questions: QuestionsState,
  reviewSession: ReviewSessionState
) => {
  const answeredQuestionIds = Object.keys(reviewSession);
  const unansweredQuestionIds = questions.filter((q) =>
    answeredQuestionIds.some((aqId) => aqId !== q.id)
  );
  if (unansweredQuestionIds.length === 0) {
    return null;
  }
  return getRandomArrayElement(unansweredQuestionIds);
};

export default getRandomUnansweredQuestion;
