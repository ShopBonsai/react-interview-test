import React from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media, Label, Input, Form } from 'reactstrap';

type Props = {
  id: string;
  image: string;
  name: string;
  price: number;
  color: string;
  size: string;
  description: string;
  quantity: number;
  validateQuantity: (e: React.ChangeEvent<HTMLInputElement>, quantity) => void;
  validateNumberInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addItemToCart: (e: React.FormEvent<HTMLFormElement>, item) => void;
};

const ProductCard: React.FC<Props> = (props) => {
  const {
    image,
    name,
    price,
    color,
    size,
    description,
    quantity,
    validateQuantity,
    validateNumberInput,
    addItemToCart,
  } = props;
  return (
    <Media className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardSubtitle style={{ fontSize: '1.4rem' }}>${price}</CardSubtitle>
        <CardText>Color: {color}</CardText>
        <CardText>Size: {size}</CardText>
        <CardText>Details: {description}</CardText>
        <Form data-testid="form" onSubmit={(e) => addItemToCart(e, props)}>
          <Label for="quantity">QTY:</Label>
          <Input
            id="quantity"
            aria-label="quantity-input"
            type="number"
            defaultValue={quantity < 1 ? quantity : 1}
            min="1"
            max={quantity}
            onChange={(e) => validateQuantity(e, quantity)}
            onKeyPress={validateNumberInput}
          />
          <CardText className="text-danger">{quantity} left in stock</CardText>
          <Button color="primary" size="lg" block>
            Add To Cart
          </Button>
        </Form>
      </CardBody>
    </Media>
  );
};

export default ProductCard;
