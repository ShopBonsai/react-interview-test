import { Input } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

//NOTE: ideally this would be stored in global utils, not buried in a component
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const EmailAddressInput = (props) => {
  const { emailAddress, setEmailAddress, setValidState } = props;

  let emailInputProps = {};
  if (emailAddress) {
    const isValid = validateEmail(emailAddress);
    if (isValid) {
      emailInputProps = {
        valid: true,
      };
      setValidState(true);
    } else {
      emailInputProps = {
        invalid: true,
      };
      setValidState(false);
    }
  }
  return (
    <Input
      value={emailAddress}
      {...emailInputProps}
      type="email"
      onChange={setEmailAddress}
    />
  );
};

EmailAddressInput.propTypes = {
  emailAddress: PropTypes.string,
  setEmailAddress: PropTypes.func,
  setValidState: PropTypes.func,
};
