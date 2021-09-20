import { useTypedSelector } from "../../redux/reducers";
import getRandomUnansweredQuestion from "../getRandomUnansweredQuestion";

const useRandomUnansweredQuestion = () => {
  const quesions = useTypedSelector(({ questions }) => questions);
  const reviewSession = useTypedSelector(({ reviewSession }) => reviewSession);

  return getRandomUnansweredQuestion(quesions, reviewSession);
};

export default useRandomUnansweredQuestion;
