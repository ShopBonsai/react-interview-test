import React from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";

export const Product = ({
  id,
  color,
  description,
  image,
  name,
  price,
  size,
}) => {
  return (
    <Media key={id} className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button color="primary" size="lg" block>
          Buy
        </Button>
      </CardBody>
    </Media>
  );
};
