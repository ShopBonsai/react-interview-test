import { Button } from "reactstrap";
import { PropTypes } from "prop-types";
import React from "react";

export const NotifyMeButton = ({ handleNotifyMe, isEnabled }) => {
  // NOTE: currently this button does not have a disabled state - it is just hidden -
  // this functionality is included to make this component more portable
  const color = isEnabled ? "warning" : "secondary";

  return (
    <Button
      block
      color={color}
      disabled={!isEnabled}
      size="lg"
      onClick={handleNotifyMe}
    >
      Out of Stock
    </Button>
  );
};

NotifyMeButton.propTypes = {
  handleNotifyMe: PropTypes.func,
  isEnabled: PropTypes.bool,
};
