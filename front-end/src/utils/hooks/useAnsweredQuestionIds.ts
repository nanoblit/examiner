import { useAppSelector } from "../../redux/hooks";
import answeredQuestionIdsSelector from "../selectors/answeredQuestionIdsSelector";
import { shallowEqual } from "react-redux";

const useAsweredQuestionIds = () => {
  return useAppSelector(answeredQuestionIdsSelector, shallowEqual)
};

export default useAsweredQuestionIds;
