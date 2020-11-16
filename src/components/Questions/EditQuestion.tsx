import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { addQuestionAction, editQuestionAction } from "../../actions";
import { useTypedSelector } from "../../reducers";

const EditQuestion: React.FC = () => {
  const { questionId }: { questionId: string | undefined } = useParams();
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [redirect, setRedirect] = useState(false);
  const questionFromStore = useTypedSelector((state) =>
    state.questions.questions.find(({ id }) => id === questionId)
  );
  const dispatch = useDispatch();

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestionText(() => value);
  };

  const updateAnswer = (answerText: string, answerId: string) => {
    setAnswers((prev) => {
      const newPrev = { ...prev };
      newPrev[answerId] = answerText;
      return newPrev;
    });
  };

  const switchAnswer = (idx: number) => {
    if (correctAnswers.includes(idx)) {
      setCorrectAnswers((prev) => prev.filter((answer) => answer !== idx));
    } else {
      setCorrectAnswers((prev) => [...prev, idx].sort((a, b) => a - b));
    }
  };

  const addNewAnswer = (answerText = "") =>
    setAnswers((prev) => Object.assign({}, prev, { [uuidv4()]: answerText }));

  const addQuestionAndRedirect = () => {
    dispatch(
      addQuestionAction({
        id: uuidv4(),
        question: questionText,
        answers: Object.entries(answers).map(([_, answer]) => answer),
        correctAnswers,
      })
    );
    setRedirect(() => true);
  };

  const editQuestionAndRedirect = () => {
    if (!questionId) {
      return;
    }
    dispatch(
      editQuestionAction({
        id: questionId,
        question: questionText,
        answers: Object.entries(answers).map(([_, answer]) => answer),
        correctAnswers,
      })
    );
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
  };

  useEffect(() => {
    questionId && setQuestionData();
  }, []);

  return (
    <div>
      <textarea value={questionText} onChange={updateQuestion}></textarea>
      <div className="answers">
        {Object.entries(answers).map(([id, answer], idx) => (
          <div key={id}>
            <input
              value={answer}
              onChange={(e) => updateAnswer(e.target.value, id)}
            ></input>
            <input
              type="checkbox"
              defaultChecked={correctAnswers.includes(idx)}
              onChange={() => switchAnswer(idx)}
            ></input>
          </div>
        ))}
      </div>
      <button onClick={() => addNewAnswer()}>+</button>
      {questionId ? (
        <button onClick={editQuestionAndRedirect}>Edit Question</button>
      ) : (
        <button onClick={addQuestionAndRedirect}>Add Question</button>
      )}
      {redirect && <Redirect to="/questions/editor" />}
    </div>
  );
};

export default EditQuestion;
