import styled from "styled-components";
import { borderRadius, searchBarColor, grayColor } from "../../../styles/values";

const StyledSearchBar = styled.div`
  position: relative;
  width: 100%;

  input {
    font-size: 1.4rem;
    outline: none;
    border: ${borderRadius};
    width: 100%;
    height: 40px;
    background-color: ${searchBarColor};
    padding: 0 4rem 0 1.5rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  
  i {
    width: 4rem;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: ${grayColor}
  }
`;

export default StyledSearchBar;
