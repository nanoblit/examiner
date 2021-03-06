import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import Button from "../common/Button/Button";
import StyledNavbar from "./NavbarStyle";

const Navbar: React.FC = () => {
  const history = useHistory();

  return (
    <StyledNavbar>
      <i className="material-icons">done</i>
      <NavLink to="/questions" tabIndex={-1}>
        <Button>Questions</Button>
      </NavLink>
      <NavLink to="/revision" tabIndex={-1}>
        <Button
          onClick={() => {
            history.push("/revision");
            history.go(0);
          }}
        >
          Revision
        </Button>
      </NavLink>
    </StyledNavbar>
  );
};

export default Navbar;
