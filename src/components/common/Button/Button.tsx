import React from "react";

import StyledButton from "./ButtonStyle";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundIcon?: string;
  backgroundIconSize?: string;
};

const Button: React.FC<Props> = ({
  onClick,
  children,
  width,
  height,
  fontSize,
  backgroundIconSize,
  backgroundIcon,
}) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      backgroundIconSize={backgroundIconSize}
      onClick={onClick}
    >
      <div className="buttonIcon"><i className="material-icons">done</i></div>
      {children}
    </StyledButton>
  );
};

export default Button;
