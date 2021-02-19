import { Button } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

export const BuyNowButton = ({ handleBuyNow, isEnabled }) => {
  const color = isEnabled ? "primary" : "secondary";

  return (
    <Button
      block
      color={color}
      disabled={!isEnabled}
      size="lg"
      onClick={handleBuyNow}
    >
      Buy
    </Button>
  );
};

BuyNowButton.propTypes = {
  handleBuyNow: PropTypes.func,
  isEnabled: PropTypes.bool,
};
