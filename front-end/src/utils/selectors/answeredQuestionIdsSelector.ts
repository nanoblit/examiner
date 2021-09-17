import { ReviewSessionState } from "../../redux/actions/types";

const answeredQuestionIdsSelector = ({
  reviewSession,
}: {
  reviewSession: ReviewSessionState;
}) => Object.keys(reviewSession);

export default answeredQuestionIdsSelector;
