import { useAppSelector } from "../../redux/hooks";
import getRandomUnansweredQuestion from "../getRandomUnansweredQuestion";

const useRandomUnansweredQuestion = () => {
  const quesions = useAppSelector(({ questions }) => questions);
  const reviewSession = useAppSelector(({ reviewSession }) => reviewSession);

  return getRandomUnansweredQuestion(quesions, reviewSession);
};

export default useRandomUnansweredQuestion;
