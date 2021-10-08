import { QuestionsState } from "../../redux/slices/questionsSlice";
import { ReviewSessionState } from "../../redux/slices/reviewSessionSlice";

const questionsToAnswerCountSelector = ({
  questions,
  reviewSession,
}: {
  questions: QuestionsState;
  reviewSession: ReviewSessionState;
}) => questions.length - Object.keys(reviewSession).length;

export default questionsToAnswerCountSelector;