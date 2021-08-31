import React from "react";

import StyledSearchBar from "./SearchBarStyle";

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const SearchBar: React.FC<Props> = ({ onChange, value }) => {
  return (
    <StyledSearchBar>
      <input placeholder="Search" onChange={onChange} value={value}></input>
      <i className="material-icons">search</i>
    </StyledSearchBar>
  );
};

export default SearchBar;
