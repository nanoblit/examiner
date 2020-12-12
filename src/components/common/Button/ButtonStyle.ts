import styled from "styled-components";

import { borderRadius, buttonColor } from "../../../styles/values";

const Wrapper = styled.button`
border: none;
background: ${buttonColor};
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
padding: 5px 10px;
border-radius: ${borderRadius};
`;

export default Wrapper;