import { ReviewSessionState } from "../../redux/slices/reviewSessionSlice";

const answeredQuestionIdsSelector = ({
  reviewSession,
}: {
  reviewSession: ReviewSessionState;
}) => Object.keys(reviewSession);

export default answeredQuestionIdsSelector;
