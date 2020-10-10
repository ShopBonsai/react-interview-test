import React, { useState, useEffect } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
  Popover,
  PopoverBody,
  Input,
} from "reactstrap";
import "./styles.css";
import { cartItemsVar } from "../../cache";

const ProductCard = (props) => {
  const { id, color, description, image, name, price, size } = props.product;
  const { merchant } = props;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const handleChange = (event) => {
    const newCount = parseInt(event.target.value);
    setCount(isNaN(newCount) ? 0 : newCount);
  };

  const onBuyBtnClick = () => {
    const cartItems = { ...cartItemsVar() };
    const itemCount = cartItems[id]
      ? parseInt(cartItems[id].count) + parseInt(count)
      : count;

    cartItems[id] = { id, name, image, count: itemCount };
    cartItemsVar(cartItems);

    setCount(0);

    setTimeout(() => {
      setPopoverOpen(false);
    }, 2000);
  };

  useEffect(() => {
    const newCount = parseInt(count);
    const isDisabled = isNaN(newCount) || newCount === 0;
    setButtonDisabled(isDisabled);
  }, [count]);

  return (
    <Media className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardSubtitle>Merchant: {merchant}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <div className="quantity-input">
          <Input
            style={{ width: 70, textAlign: "center" }}
            type="number"
            value={count}
            min="0"
            onChange={handleChange}
          ></Input>
        </div>
        <Button
          id={`button-${id}`}
          color="primary"
          size="lg"
          block
          disabled={buttonDisabled}
          onClick={onBuyBtnClick}
        >
          Buy
        </Button>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target={`button-${id}`}
          toggle={toggle}
        >
          <PopoverBody>Added to Cart</PopoverBody>
        </Popover>
      </CardBody>
    </Media>
  );
};

export default ProductCard;