import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { addQuestionAction } from "../../actions";

const AddQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestion(() => value);
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

  const addNewAnswer = () =>
    setAnswers((prev) => Object.assign({}, prev, { [uuidv4()]: "" }));

  const addQuestionAndRedirect = () => {
    dispatch(
      addQuestionAction({
        id: uuidv4(),
        question,
        answers: Object.entries(answers).map(([_, answer]) => answer),
        correctAnswers,
      })
    );
    setRedirect(() => true);
  };

  return (
    <div>
      <textarea value={question} onChange={updateQuestion}></textarea>
      <div className="answers">
        {Object.entries(answers).map(([id, answer], idx) => (
          <div key={id}>
            <input
              value={answer}
              onChange={(e) => updateAnswer(e.target.value, id)}
            ></input>
            <input
              type="checkbox"
              value={`${correctAnswers.includes(idx)}`}
              onChange={() => switchAnswer(idx)}
            ></input>
          </div>
        ))}
      </div>
      <button onClick={addNewAnswer}>+</button>
      <button onClick={addQuestionAndRedirect}>Add Question</button>
      {redirect && <Redirect to="/questions/editor" />}
    </div>
  );
};

export default AddQuestion;
