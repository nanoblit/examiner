import React from "react";

import StyledButton from "./ButtonStyle";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<Props> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
