import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import Button from "../Button/Button";
import StyledLayout, { StyledNav } from "./LayoutStyle";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const history = useHistory();

  return (
    <StyledLayout>
      <StyledNav>
        <i className="material-icons">done</i>
        <NavLink to="/questions" tabIndex={-1}>
          <Button>Add Questions</Button>
        </NavLink>
        <NavLink to="/review" tabIndex={-1}>
          <Button
            onClick={() => {
              history.push("/review");
              history.go(0);
            }}
          >
            Review
          </Button>
        </NavLink>
      </StyledNav>
      {children}
    </StyledLayout>
  );
};

export default Layout;
