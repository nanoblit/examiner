import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import Button from "../common/Button/Button";
import StyledNavbar from "./NavbarStyle";

const Navbar: React.FC = () => {

  return (
    <StyledNavbar>
      <i className="material-icons">done</i>
      <NavLink to="/questions" tabIndex={-1}>
        <Button>Add Questions</Button>
      </NavLink>
      <NavLink to="/review" tabIndex={-1}>
        <Button>Review</Button>
      </NavLink>
    </StyledNavbar>
  );
};

export default Navbar;
