import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import Editor from "./Editor";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../reducers";
import { QuestionsState, isQuestionsState } from "../../actions/types";
import { useDispatch } from "react-redux";
import { setQuestionsAction } from "../../actions";

const Questions: React.FC = () => {
  const match = useRouteMatch();
  const questions = useTypedSelector(({ questions }) => questions);
  const dispatch = useDispatch();

  const questionsStateFromString = (contents: string) => {
    try {
      const parsedFileContents = JSON.parse(contents);
      if (!isQuestionsState(parsedFileContents)) {
        console.log("File has wrong format"); 
        return;
      }
      return parsedFileContents as QuestionsState;
    } catch (e) {
      console.log("Couldn't parse file contents as JSON");
    }
  }

  const saveQuestionsState = (fileList: FileList | null) => {
    if (fileList === null || fileList.length < 1) {
      return;
    }
    const file = fileList[0];

    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      if (!e.target || typeof e.target.result !== "string") {
        console.log("Couldn't get string from file");
        return;
      }
      const questionsState = questionsStateFromString(e.target.result);
      questionsState && dispatch(setQuestionsAction(questionsState));
    })
    reader.readAsText(file);
  }

  return (
    <Switch>
      <Route path={`${match.path}/editor`}>
        <Editor />
      </Route>
      <Route path={match.path}>
        <Link to={`${match.url}/editor`}>Edit Questions</Link>
        <br />
        Upload Questions
        <input type="file" accept=".json" onChange={(e) => saveQuestionsState(e.target.files)}></input>
        <br />
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
            JSON.stringify(questions)
          )}`}
          download="questions.json"
        >
          Download Questions
        </a>
      </Route>
    </Switch>
  );
};

export default Questions;
