import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestionAction } from "../../actions";
import { Redirect } from "react-router";

const AddQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestion(() => value);
  };

  const updateAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIdx: number
  ) => {
    const { value } = e.target;
    setAnswers((prevState) =>
      prevState.map((answer, idx) => (idx === answerIdx ? value : answer))
    );
  };

  const switchAnswer = (idx: number) => {
    if (correctAnswers.includes(idx)) {
      setCorrectAnswers((prevState) =>
        prevState.filter((answer) => answer !== idx)
      );
    } else {
      setCorrectAnswers((prevState) =>
        [...prevState, idx].sort((a, b) => a - b)
      );
    }
  };

  const addNewAnswer = () => setAnswers((prevState) => [...prevState, ""]);

  const addQuestion = () => {
    dispatch(addQuestionAction({ question, answers, correctAnswers }));
    setRedirect(() => true);
  };

  return (
    <div>
      <textarea value={question} onChange={updateQuestion}></textarea>
      <div className="answers">
        {answers.map((answer, idx) => (
          <div key={idx}>
            <input
              value={answer}
              onChange={(e) => updateAnswer(e, idx)}
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
      <button onClick={addQuestion}>Add Question</button>
      {redirect && <Redirect to="/questions/editor" />}
    </div>
  );
};

export default AddQuestion;
