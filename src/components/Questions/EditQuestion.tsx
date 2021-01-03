import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import {
  addQuestionAction,
  editQuestionAction,
  deleteQuestionAction,
} from "../../actions";
import { useTypedSelector } from "../../reducers";

const EditQuestion: React.FC = () => {
  const { questionId }: { questionId: string | undefined } = useParams();
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [redirect, setRedirect] = useState(false);
  const questionFromStore = useTypedSelector(({ questions }) =>
    questions.find(({ id }) => id === questionId)
  );
  const dispatch = useDispatch();

  const updateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setQuestionText(() => value);
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

    if (questionText.indexOf("Answer:") < 0) {
      return;
    }

    let currentQuestionBeginning = "A.";

    const newQuestionText = questionText.slice(
      0,
      questionText.indexOf(currentQuestionBeginning)
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

    setQuestionText(() => newQuestionText);
    setAnswers(() => newAnswers);
    setCorrectAnswers(() => [newCorrectAnswer]);
  };

  const isQuestionValid = () => {
    if (questionText.trim().localeCompare("") === 0) {
      console.warn("Question text is required");
      return false;
    }
    if (answers.length === 0) {
      console.warn("Answers are required");
      return false;
    }
    for (const answer of answers) {
      if (answer.trim().localeCompare("") === 0) {
        console.warn("All answer texts are required");
        return false;
      }
    }
    if (correctAnswers.length === 0) {
      console.warn("At least one answer has to be correct");
      return false;
    }
    return true;
  };

  const addQuestionAndRedirect = () => {
    resolveSecret();
    if (!isQuestionValid()) {
      return;
    }

    dispatch(
      addQuestionAction({
        id: uuidv4(),
        question: questionText.trim(),
        answers: Object.entries(answers).map(([_, answer]) => answer.trim()),
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

  const deleteQuestionAndRedirect = () => {
    if (!questionId) {
      return;
    }
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
  };

  useEffect(() => {
    questionId && setQuestionData();
  }, []);

  return (
    <div>
      <p>Question:</p>
      <textarea value={questionText} onChange={updateQuestion}></textarea>
      <p>Answers:</p>
      <div className="answers">
        {answers.map((answer, idx) => (
          <div key={idx}>
            <textarea
              value={answer}
              onChange={(e) => updateAnswer(e.target.value, idx)}
            ></textarea>
            <input
              type="checkbox"
              defaultChecked={correctAnswers.includes(idx)}
              onChange={() => switchAnswer(idx)}
            ></input>
          </div>
        ))}
      </div>
      <button onClick={() => addNewAnswer()}>+</button>
      <button onClick={removeLastAnswer}>-</button>
      {questionId ? (
        <>
          <button onClick={editQuestionAndRedirect}>Save Question</button>
          <button onClick={deleteQuestionAndRedirect}>Delete Question</button>
        </>
      ) : (
        <button onClick={addQuestionAndRedirect}>Add Question</button>
      )}
      {redirect && <Redirect to="/questions/editor" />}
    </div>
  );
};

export default EditQuestion;
