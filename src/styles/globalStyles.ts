import { createGlobalStyle } from "styled-components";

import reset from "./reset";
import { fontColor } from "./values";
import { setSizing } from "./setSizing";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${setSizing}
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body, button  {
    font-family: 'Roboto', sans-serif; 
    color: ${fontColor};
  }
  i {
    cursor: default;
  }
`;

export default GlobalStyle;
