import { Button } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

export const FavouriteButton = ({ handleManageFavourites, isToggledOn }) => {
  // NOTE: disabling of this generally useful linting rule
  // as there are some exceptions as to where it should be applied
  // eslint-disable-next-line no-magic-numbers

  const buttonPrompt = isToggledOn
    ? "Remove From Favourites"
    : "Add To Favourites";

  const buttonColor = isToggledOn ? "success" : "primary";

  return (
    <Button
      block
      color={buttonColor}
      size="lg"
      onClick={handleManageFavourites}
    >
      {buttonPrompt}
    </Button>
  );
};

FavouriteButton.propTypes = {
  handleManageFavourites: PropTypes.func,
  isToggledOn: PropTypes.bool,
};
