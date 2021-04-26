import styled from "styled-components";
import { Input } from "reactstrap";

export const Header = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

export const FilterInput = styled(Input)`
  max-width: 50%;
  margin-right: 25%;
`;

