import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { isQuestionsState, QuestionsState } from "../../../actions/types";
import { setQuestionsAction } from "../../../actions";
import StyledDropzone from "./DropzoneStyle";

const Dropzone: React.FC = () => {
  const dispatch = useDispatch();

  const questionsStateFromString = (contents: string) => {
    try {
      const parsedFileContents = JSON.parse(contents);
      if (!isQuestionsState(parsedFileContents)) {
        console.warn("File isn't in the correct questions format (.json)");
        toast.error("File isn't in the correct questions format (.json)");
        return;
      }
      return parsedFileContents as QuestionsState;
    } catch (e) {
      console.warn("Couldn't parse file contents as JSON");
      toast.error("Couldn't parse file contents as JSON");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => {
      console.warn("File reading was aborted");
      toast.error("File reading was aborted");
    };
    reader.onerror = (e) => {
      console.warn(e);
      toast.error(e);
    };
    reader.onload = (e) => {
      if (typeof e.target?.result !== "string") {
        console.warn("Couldn't get string from file");
        toast.error("Couldn't get string from file");
        return;
      }
      const questionsState = questionsStateFromString(e.target.result);
      questionsState && dispatch(setQuestionsAction(questionsState));
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} accept=".json" />
      <div className="buttonIcon">
        <i className="material-icons">publish</i>
      </div>
      {isDragActive ? (
        <span>Drop the questions file here...</span>
      ) : (
        <span>Drag and drop here or click to upload the questions file</span>
      )}
    </StyledDropzone>
  );
};

export default Dropzone;
