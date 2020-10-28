import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <NavLink to="/questions">Questions</NavLink>
      <NavLink to="/revision">Revision</NavLink>
      <NavLink to="/exam">Exam</NavLink>
    </nav>
  );
};

export default Navbar;
