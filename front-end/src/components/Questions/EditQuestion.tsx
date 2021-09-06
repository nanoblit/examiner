import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import {
  addQuestionAction,
  editQuestionAction,
  deleteQuestionAction,
} from "../../redux/actions";
import { useTypedSelector } from "../../redux/reducers";
import AnswerField, {
  AnswerFieldType,
} from "../common/AnswerField/AnswerField";
import StyledEditQuestion from "./EditQuestionStyle";
import Button from "../common/Button/Button";
import QuestionField from "../common/QuestionField/QuestionField";
import { toast } from "react-toastify";
import Layout from "../common/Layout/Layout";

const EditQuestion: React.FC = () => {
  const { questionId }: { questionId: string | undefined } = useParams();
  const editingExistingQuestion = useMemo(() => !!questionId, [questionId]);
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

  /////////////////// Question Field ///////////////////

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestionText(() => value);
  };

  /////////////////// Explanation Field ///////////////////

  const updateExplanation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setExplanation(() => value);
  };

  /////////////////// Answer Fields ///////////////////

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

  /////////////////// Question Content ///////////////////

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

  const editQuestion = () => {
    if (!questionId) {
      return;
    }
    dispatch(
      editQuestionAction({
        id: questionId,
        question: questionText.trim(),
        answers: Object.entries(answers).map(([_, answer]) => answer.trim()),
        correctAnswers,
        explanation: explanation.length > 0 ? explanation : undefined,
      })
    );
  };

  const addQuestionAndRedirect = () => {
    if (!isQuestionValid()) {
      return;
    }
    addQuestion();
    setRedirect(() => true);
  };

  const editQuestionAndRedirect = () => {
    if (!editingExistingQuestion || !isQuestionValid()) {
      return;
    }
    editQuestion();
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

  // Insert question data into the fields
  useEffect(() => {
    if (editingExistingQuestion) {
      setQuestionData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionFromStore]);

  return (
    <Layout>
      <StyledEditQuestion>
        <p>Question:</p>
        <QuestionField
          text={questionText}
          onChange={updateQuestion}
        ></QuestionField>
        <p>
          Answers (click the "x" symbol to select which answers are correct):
        </p>
        <div className="answers">
          {answers.map((answer, idx) => (
            <AnswerField
              key={idx}
              type={AnswerFieldType.Editable}
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
        <p>Explanation (optional, seen after answering the question):</p>
        <QuestionField
          text={explanation}
          onChange={updateExplanation}
        ></QuestionField>
        <div className="questionButtons">
          {editingExistingQuestion ? (
            <>
              <Button onClick={editQuestionAndRedirect}>Save Question</Button>
              <Button onClick={deleteQuestionAndRedirect} color="danger">
                Delete Question
              </Button>
            </>
          ) : (
            <Button onClick={addQuestionAndRedirect}>Save Question</Button>
          )}
        </div>
        {redirect && <Redirect to="/questions/editor" />}
      </StyledEditQuestion>
    </Layout>
  );
};

export default EditQuestion;
