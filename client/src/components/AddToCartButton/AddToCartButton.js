import React from 'react';
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from 'reactstrap';

// TODO: We need some globals state to view the current users cart...
// TODO: We also need to run some graphql mutations for persisting their cart...
const addToCart = async curProduct => {
  if (product.quantity <= 0) return;
};

const AddToCartButton = ({ product }) => {
  return (
    <Button
      color="secondary"
      size="lg"
      block
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
