import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../common/Button/Button";
import StyledNavbar from "./NavbarStyle";

const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <i className="material-icons">done</i>
      <NavLink to="/questions"><Button>Questions</Button></NavLink>
      <NavLink to="/revision"><Button>Revision</Button></NavLink>
    </StyledNavbar>
  );
};

export default Navbar;
