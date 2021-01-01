import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../common/Button/Button";

const Navbar: React.FC = () => {
  return (
    <nav>
      {/* <Button>Hey</Button> */}
      <NavLink to="/questions">Questions</NavLink>
      <NavLink to="/revision">Revision</NavLink>
      {/* <NavLink to="/exam">Exam</NavLink> */}
    </nav>
  );
};

export default Navbar;
