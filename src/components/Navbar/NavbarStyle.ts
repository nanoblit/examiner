import styled from "styled-components";
import { navColor, logoColor, navHeight } from "../../styles/values";

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: ${navColor};
  align-items: center;
  height: ${navHeight};
  padding: 0 2rem;
  z-index: 1;

  i {
    color: ${logoColor};
    font-size: 2.6rem;
  }

  > * {
    margin-right: 1.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default StyledNavbar;