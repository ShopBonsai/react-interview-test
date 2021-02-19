import "./styles.css";
import { Button, Card, CardBody } from "reactstrap";
import React, { useCallback, useState } from "react";
import { BuyNowButton } from "../BuyNowButton";
import { BuyNowCard } from "../BuyNowCard";
import { FavouriteButton } from "../FavouriteButton";
import { NotifyMeButton } from "../NotifyMeButton";
import { NotifyMeCard } from "../NotifyMeCard";
import PropTypes from "prop-types";

export const ProductActions = ({
  isBuyNowEnabled,
  isNotifyEnabled,
  localFavourites,
  onSetFavourites,
  product,
}) => {
  const [isNotifyMePromptShown, setNotifyMePromptState] = useState(false);
  const [isBuyNowPromptShown, setBuyNowPromptState] = useState(false);
  const productIndex = (localFavourites || []).indexOf(product.id);
  // NOTE: disabling of this generally useful linting rule
  // as there are some exceptions as to where it should be applied
  // eslint-disable-next-line no-magic-numbers
  const isFavourited = productIndex > -1;

  const handleManageFavourites = useCallback(() => {
    if (isFavourited) {
      // if the item is favourited, remove id
      localFavourites.splice(productIndex, 1);
    } else {
      // IF the item is not favourited, now do so.
      localFavourites.push(product.id);
    }

    onSetFavourites(localFavourites);
  }, [
    localFavourites,
    product.id,
    isFavourited,
    productIndex,
    onSetFavourites,
  ]);

  const handleBuyNow = useCallback(() => {
    setBuyNowPromptState(true);
  }, [setBuyNowPromptState]);

  const handleNotifyMe = useCallback(() => {
    setNotifyMePromptState(true);
  }, [setNotifyMePromptState]);

  const handleDismissPopover = useCallback(() => {
    setNotifyMePromptState(false);
    setBuyNowPromptState(false);
  }, [setBuyNowPromptState, setNotifyMePromptState]);

  let actionsPopoverContent = null;
  const actionsPopoverClass =
    isBuyNowPromptShown || isNotifyMePromptShown ? "pop visible" : "pop";

  if (isBuyNowPromptShown) {
    actionsPopoverContent = (
      <BuyNowCard product={product} onClose={handleDismissPopover} />
    );
  }

  if (isNotifyMePromptShown) {
    actionsPopoverContent = (
      <NotifyMeCard product={product} onClose={handleDismissPopover} />
    );
  }

  const actionsPopoverPrompt = (
    <Card className={actionsPopoverClass} color="success">
      <CardBody>
        <Button close onClick={handleDismissPopover} />
        {actionsPopoverContent}
      </CardBody>
    </Card>
  );

  return (
    <>
      {actionsPopoverPrompt}
      <FavouriteButton
        handleManageFavourites={handleManageFavourites}
        isToggledOn={isFavourited}
      />
      {isNotifyEnabled ? (
        <NotifyMeButton
          handleDismissPopover
          handleNotifyMe={handleNotifyMe}
          isEnabled={isNotifyEnabled}
        />
      ) : null}
      {isBuyNowEnabled ? (
        <BuyNowButton handleBuyNow={handleBuyNow} isEnabled={isBuyNowEnabled} />
      ) : null}
    </>
  );
};

ProductActions.propTypes = {
  isBuyNowEnabled: PropTypes.bool,
  isNotifyEnabled: PropTypes.bool,
  localFavourites: PropTypes.arrayOf(PropTypes.string),
  onSetFavourites: PropTypes.func,
  product: PropTypes.object,
};
