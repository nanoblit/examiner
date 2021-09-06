import React, { useState } from "react";
import Layout from "../common/Layout/Layout";
import { useDispatch } from "react-redux";
import { addOrEditReviewSessionItemAction } from "../../redux/actions";

type Props = {};

const ReviewSessionTest: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    id: "",
    answered: false,
    answeredCorrectly: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputState({ ...inputState, [e.target.name]: value });
  };

  const add = () => {
    dispatch(addOrEditReviewSessionItemAction(inputState.id, inputState));
  };

  return (
    <Layout>
      <div>
        <button onClick={add}>addOrEditReviewSessionItemAction</button>
        <br />
        <label>id</label>
        <input name="id" value={inputState.id} onChange={handleChange}></input>
        <label>answered</label>
        <input
          name="answered"
          type="checkbox"
          checked={inputState.answered}
          onChange={handleChange}
        />
        <label>answeredCorrectly</label>
        <input
          name="answeredCorrectly"
          type="checkbox"
          checked={inputState.answeredCorrectly}
          onChange={handleChange}
        />
      </div>
    </Layout>
  );
};

export default ReviewSessionTest;
