import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../../redux/hooks";
import { QuestionsState, setQuestions } from "../../../redux/slices/questionsSlice";
import StyledDropzone from "./DropzoneStyle";

const Dropzone: React.FC = () => {
  const dispatch = useAppDispatch();

  const questionsStateFromString = (contents: string) => {
    try {
      const parsedFileContents = JSON.parse(contents);
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
      toast.success("Questions successfully loaded!");
      const questionsState = questionsStateFromString(e.target.result);
      questionsState && dispatch(setQuestions(questionsState));
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
        <span>Upload Questions File</span>
      )}
    </StyledDropzone>
  );
};

export default Dropzone;
