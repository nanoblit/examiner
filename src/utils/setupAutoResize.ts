import { RefObject } from "react";

const setupAutoResize = (textAreaRef: RefObject<HTMLTextAreaElement>) => {
  const textArea = textAreaRef.current;
  if (!textArea) {
    return;
  }

  const resize = () => {
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  const delayedResize = () => {
    window.setTimeout(resize, 0);
  };

  textArea.addEventListener("change", resize);
  textArea.addEventListener("cut", delayedResize);
  textArea.addEventListener("paste", delayedResize);
  textArea.addEventListener("drop", delayedResize);
  textArea.addEventListener("keydown", delayedResize);

  textArea.focus();
  textArea.select();
  delayedResize();
};

export default setupAutoResize;