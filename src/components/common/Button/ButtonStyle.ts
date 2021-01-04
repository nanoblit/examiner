import styled from "styled-components";

import { borderRadius, buttonColor, logoColor, darkButtonColor, shadow } from "../../../styles/values";

type Props = {
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundIconSize?: string;
};

const StyledButton = styled.button<Props>`
  border: none;
  background: ${buttonColor};
  box-shadow: ${shadow};
  padding: 5px 10px;
  border-radius: ${borderRadius};
  position: relative;
  cursor: pointer;
  outline: none;
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}

  &:hover {
    background: ${darkButtonColor};
  }

  .buttonIcon {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      cursor: pointer;
      color: ${logoColor};
      font-size: ${({ backgroundIconSize }) =>
        backgroundIconSize ? backgroundIconSize : "3rem"};
    }
  }

  span {
    position: relative;
    ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : "")}
  }
`;

export default StyledButton;
