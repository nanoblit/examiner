import React from "react";
import { useParams } from "react-router";

const EditQuestion: React.FC = () => {
  const { questionId }: { questionId: string } = useParams();

  return (
    <div>
      <p>This is question {questionId}</p>
      <p>Answer 1</p>
      <p>Answer 2</p>
      <p>Answer 3</p>
      <p>Answer 4</p>
    </div>
  );
};

export default EditQuestion;
