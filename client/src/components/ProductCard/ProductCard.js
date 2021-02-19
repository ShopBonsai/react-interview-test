import { CardBody, CardSubtitle, CardText, CardTitle, Media } from "reactstrap";
import { ProductActions } from "../ProductActions";
import PropTypes from "prop-types";
import React from "react";

export const ProductCard = ({
  localFavourites,
  onSetFavourites,
  product,
  product: { color, description, id, image, name, price, quantity, size },
}) => {
  const isQuantityZero = Boolean(quantity === 0);

  return (
    <Media key={id} className="product-card">
      <Media left href="#">
        <Media object alt="Product image cap" src={image} />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <ProductActions
          isBuyNowEnabled={!isQuantityZero}
          isNotifyEnabled={isQuantityZero}
          localFavourites={localFavourites}
          product={product}
          onSetFavourites={onSetFavourites}
        />
      </CardBody>
    </Media>
  );
};
ProductCard.propTypes = {
  localFavourites: PropTypes.arrayOf(PropTypes.string),
  onBuyNow: PropTypes.func,
  onNotifyMe: PropTypes.func,
  onSetFavourites: PropTypes.func,
  product: PropTypes.object,
};
