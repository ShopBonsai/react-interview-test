import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input as ReactInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Input = ({
  className,
  icon,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <InputGroup className={className}>
      {icon && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={icon} />
          </InputGroupText>
        </InputGroupAddon>
      )}

      <ReactInput
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
};
