import styled from "styled-components";

import { borderRadius, grayColor } from "../../../styles/values";


const StyledDropzone = styled.div`
  border: none;
  background: white;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  border-radius: ${borderRadius};
  position: relative;
  cursor: pointer;
  outline: none;
  width: 17.5rem;
  height: 9.6rem;

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
      color: ${grayColor};
      font-size: 7rem;
    }
  }

  span {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
  }
`;

export default StyledDropzone;