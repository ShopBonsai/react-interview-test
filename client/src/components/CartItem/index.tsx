import React from 'react';
import { CardTitle, CardSubtitle, CardBody, CardText, Media } from 'reactstrap';

export type Props = {
  id: string;
  image: string;
  name: string;
  price: number;
  selectedQuantity: number;
  removeItemFromCart: (id: string) => void;
};

const CartItem: React.FC<Props> = (props: Props) => {
  const { id, image, name, price, selectedQuantity, removeItemFromCart } = props;
  return (
    <Media className="cart-item">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle tag="h6">{name}</CardTitle>
        <CardSubtitle style={{ fontSize: '1.2rem' }}>${price}</CardSubtitle>
        <CardText>QTY: {selectedQuantity}</CardText>
        <CardText>
          <small className="text-primary" onClick={() => removeItemFromCart(id)}>
            Remove
          </small>
        </CardText>
      </CardBody>
    </Media>
  );
};

export default CartItem;
