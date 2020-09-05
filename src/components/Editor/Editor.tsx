import React from 'react';

const Editor: React.FC = () => {
  return (
    <div>
      <input placeholder="Search" />
      <p>Question</p>
      <p>Answer 1</p> <button>Incorrect</button>
      <p>Answer 2</p> <button>Incorrect</button>
      <p>Answer 3</p> <button>Incorrect</button>
      <p>Answer 4</p> <button>Correct</button>
    </div>
  );
}

export default Editor;