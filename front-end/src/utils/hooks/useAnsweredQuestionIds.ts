import { useTypedSelector } from "../../redux/reducers";
import answeredQuestionIdsSelector from "../selectors/answeredQuestionIdsSelector";
import { shallowEqual } from "react-redux";

const useAsweredQuestionIds = () => {
  return useTypedSelector(answeredQuestionIdsSelector, shallowEqual)
};

export default useAsweredQuestionIds;
