import { QuestionsState, ReviewSessionState } from "../../redux/actions/types";

const questionsToAnswerCountSelector = ({
  questions,
  reviewSession,
}: {
  questions: QuestionsState;
  reviewSession: ReviewSessionState;
}) => questions.length - Object.keys(reviewSession).length;

export default questionsToAnswerCountSelector;