import styled from "styled-components";
import { desaturate, darken, lighten } from "polished";

import {
  borderRadius,
  shadow,
  buttonColor,
} from "../../../styles/values";

type Props = {
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundIconSize?: string;
  color?: string;
};

export const ButtonIcon = styled.div``;

const StyledButton = styled.button<Props>`
  border: none;
  background: ${({ color }) => (color ? color : buttonColor)};
  box-shadow: ${shadow};
  padding: 5px 10px;
  border-radius: ${borderRadius};
  position: relative;
  cursor: pointer;
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}

  &:hover {
    background: ${({ color }) => lighten(0.06, color ? color : buttonColor)};
  }

  ${ButtonIcon} {
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
      color: ${({ color }) => desaturate(0.25, darken(0.1, color ? color : buttonColor))};
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
