import React from "react";

import Wrapper from "./ButtonStyle";

type Props = {
};

const Button: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Button;
