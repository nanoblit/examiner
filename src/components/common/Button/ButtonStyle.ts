import styled from "styled-components";

import { borderRadius, buttonColor } from "../../../styles/values";

type Props = {
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundIconSize?: string;
};

const StyledButton = styled.button<Props>`
  border: none;
  background: ${buttonColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  border-radius: ${borderRadius};
  position: relative;
  cursor: pointer;
  outline: none;
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : "")}

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
      font-size: ${({ backgroundIconSize }) =>
        backgroundIconSize ? backgroundIconSize : "3rem"};
    }
  }
`;

export default StyledButton;
