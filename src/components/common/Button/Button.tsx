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
      {backgroundIcon && (
        <div className="buttonIcon">
          <i className="material-icons">{backgroundIcon}</i>
        </div>
      )}
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
