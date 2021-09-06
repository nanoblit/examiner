import React from "react";

import StyledButton, { ButtonIcon } from "./ButtonStyle";
import { buttonColor, redButtonColor } from "../../../styles/values";

type ButtonColorsType = "primary" | "danger";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  color?: ButtonColorsType;
  backgroundIcon?: string;
  backgroundIconSize?: string;
  ariaLabel?: string;
};

const Button: React.FC<Props> = ({
  onClick,
  children,
  width,
  height,
  fontSize,
  color,
  backgroundIconSize,
  backgroundIcon,
  ariaLabel,
}) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      color={(() => {
        switch (color) {
          case "primary": 
            return buttonColor;
          case "danger":
            return redButtonColor;
          default:
            return buttonColor;
        }
      })()}
      backgroundIconSize={backgroundIconSize}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {backgroundIcon && (
        <ButtonIcon>
          <i className="material-icons">{backgroundIcon}</i>
        </ButtonIcon>
      )}
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
