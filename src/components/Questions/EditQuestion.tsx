import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import {
  addQuestionAction,
  editQuestionAction,
  deleteQuestionAction,
} from "../../actions";
import { useTypedSelector } from "../../reducers";
import AnswerField from "../common/AnswerField/AnswerField";
import StyledEditQuestion from "./EditQuestionStyle";
import Button from "../common/Button/Button";
import QuestionField from "../common/QuestionField/QuestionField";
import { toast } from "react-toastify";

const EditQuestion: React.FC = () => {
  const { questionId }: { questionId: string | undefined } = useParams();
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [explanation, setExplanation] = useState("");
  const [redirect, setRedirect] = useState(false);
  const questions = useTypedSelector(({ questions }) => questions);

  const questionFromStore = useMemo(
    () => questions.find(({ id }) => id === questionId),
    [questionId, questions]
  );

  const dispatch = useDispatch();

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestionText(() => value);
  };

  const updateExplanation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setExplanation(() => value);
  };

  const updateAnswer = (answerText: string, answerIdx: number) => {
    setAnswers((prev) => {
      return prev.map((answer, idx) =>
        idx === answerIdx ? answerText : answer
      );
    });
  };

  const switchAnswer = (idx: number) => {
    correctAnswers.includes(idx)
      ? setCorrectAnswers((prev) => prev.filter((answer) => answer !== idx))
      : setCorrectAnswers((prev) => [...prev, idx].sort((a, b) => a - b));
  };

  const addNewAnswer = (answerText = "") =>
    setAnswers((prev) => [...prev, answerText]);

  const removeLastAnswer = () => {
    setCorrectAnswers((prev) =>
      prev.filter((correctAnswerId) => correctAnswerId !== answers.length - 1)
    );
    setAnswers((prev) => prev.filter((_, idx) => idx !== prev.length - 1));
  };

  const resolveSecret = () => {
    const nextLetter = (letter: string) => {
      return String.fromCharCode(letter.charCodeAt(0) + 1);
    };

    const getQuestionNumber = (question: string) => {
      return question.slice(question.indexOf(".") + 1, question.indexOf(" "));
    };

    const generateLongNumberString = (num: string) => {
      let newNum = `${num}`;
      while (newNum.length < 3) {
        newNum = `0${newNum}`;
      }
      return newNum;
    };

    if (questionText.indexOf("Answer:") < 0) {
      return;
    }

    let currentQuestionBeginning = "A.";

    let newQuestionText = questionText.slice(
      0,
      questionText.indexOf(currentQuestionBeginning)
    );

    let questionNumber = getQuestionNumber(newQuestionText);
    let longerQuestionNumber = generateLongNumberString(questionNumber);

    newQuestionText = newQuestionText.replace(
      questionNumber,
      longerQuestionNumber
    );

    let questionReminder = questionText;

    const newAnswers: string[] = [];
    do {
      questionReminder = questionReminder.slice(
        questionReminder.indexOf(currentQuestionBeginning)
      );
      currentQuestionBeginning = `${nextLetter(currentQuestionBeginning)}.`;
      const nextEndIndex = questionReminder.indexOf(currentQuestionBeginning);
      newAnswers.push(
        questionReminder.slice(
          0,
          nextEndIndex > -1 ? nextEndIndex : questionReminder.indexOf("Answer:")
        )
      );
    } while (questionReminder.indexOf(currentQuestionBeginning) > -1);

    const newCorrectAnswer =
      questionReminder[questionReminder.indexOf("Answer: ") + 8].charCodeAt(0) -
      65;

    const newExplanation =
      questionReminder.indexOf("Explanation") > -1
        ? questionReminder.slice(questionReminder.indexOf("Explanation") + 12)
        : "";

    setQuestionText(() => newQuestionText);
    setAnswers(() => newAnswers);
    setCorrectAnswers(() => [newCorrectAnswer]);
    setExplanation(() => newExplanation);
  };

  const isQuestionValid = () => {
    if (questionText.trim().localeCompare("") === 0) {
      console.warn("Question text is required");
      toast.error("Question text is required");
      return false;
    }
    if (answers.length === 0) {
      console.warn("Answers are required");
      toast.error("Answers are required");
      return false;
    }
    for (const answer of answers) {
      if (answer.trim().localeCompare("") === 0) {
        console.warn("All answer texts are required");
        toast.error("All answer texts are required");
        return false;
      }
    }
    if (correctAnswers.length === 0) {
      console.warn("At least one answer has to be correct");
      toast.error("At least one answer has to be correct");
      return false;
    }
    return true;
  };

  const addQuestion = () => {
    dispatch(
      addQuestionAction({
        id: uuidv4(),
        question: questionText.trim(),
        answers: Object.entries(answers).map(([_, answer]) => answer.trim()),
        correctAnswers,
        explanation: explanation.length > 0 ? explanation : undefined,
      })
    );
  };

  const addQuestionAndRedirect = () => {
    resolveSecret();
    if (!isQuestionValid()) {
      return;
    }
    addQuestion();
    setRedirect(() => true);
  };

  const editQuestionAndRedirect = () => {
    if (!questionId) {
      return;
    }
    addQuestion();
    setRedirect(() => true);
  };

  const deleteQuestionAndRedirect = () => {
    if (!questionId) {
      return;
    }
    toast.success("Question deleted");
    dispatch(deleteQuestionAction(questionId));
    setRedirect(() => true);
  };

  const setQuestionData = () => {
    const q = questionFromStore;
    if (!q) return;
    setQuestionText(() => q.question);
    q.answers.forEach((answer, idx) => {
      addNewAnswer(answer);
      if (q.correctAnswers.indexOf(idx) > -1) {
        switchAnswer(idx);
      }
    });
    setExplanation(() => (q.explanation ? q.explanation : ""));
  };

  useEffect(() => {
    if (questionId) {
      setQuestionData();
    }
  }, [questionFromStore]);

  return (
    <StyledEditQuestion>
      <p>Question:</p>
      <QuestionField
        text={questionText}
        onChange={updateQuestion}
      ></QuestionField>
      <p>Answers:</p>
      <div className="answers">
        {answers.map((answer, idx) => (
          <AnswerField
            key={idx}
            text={answer}
            onChangeText={(e) => updateAnswer(e.target.value, idx)}
            defaultChecked={correctAnswers.includes(idx)}
            isChecked={correctAnswers.includes(idx)}
            onChangeCheckbox={() => switchAnswer(idx)}
          />
        ))}
      </div>
      <div className="answersButtons">
        <Button
          backgroundIcon="add"
          width="5rem"
          height="5rem"
          backgroundIconSize="3rem"
          onClick={() => addNewAnswer()}
          ariaLabel="Add Answer"
        ></Button>
        <Button
          backgroundIcon="remove"
          width="5rem"
          height="5rem"
          backgroundIconSize="3rem"
          onClick={removeLastAnswer}
          ariaLabel="Remove Last Answer"
        ></Button>
      </div>
      <p>Explanation (optional):</p>
      <QuestionField
        text={explanation}
        onChange={updateExplanation}
      ></QuestionField>
      <div className="questionButtons">
        {questionId ? (
          <>
            <Button onClick={editQuestionAndRedirect}>Save Question</Button>
            <Button onClick={deleteQuestionAndRedirect}>Delete Question</Button>
          </>
        ) : (
          <Button onClick={addQuestionAndRedirect}>Save Question</Button>
        )}
      </div>
      {redirect && <Redirect to="/questions/editor" />}
    </StyledEditQuestion>
  );
};

export default EditQuestion;
