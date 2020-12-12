import { createGlobalStyle } from "styled-components";

import reset from "./reset";
import { fontColor, defaultFontSize } from "./values";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html { font-size: 10px; }
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  *,  {
    font-family: 'Roboto', sans-serif; 
    color: ${fontColor};
    font-size: ${defaultFontSize}
  }
`;

export default GlobalStyle;
