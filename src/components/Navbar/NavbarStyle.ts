import styled from "styled-components";
import { navColor, logoColor } from "../../styles/values";

const StyledNavbar = styled.nav`
  display: flex;
  background-color: ${navColor};
  padding: 0.5rem 2rem;

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