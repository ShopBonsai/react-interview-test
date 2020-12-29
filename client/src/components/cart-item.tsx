import React, { FunctionComponent } from 'react';
import { Row, Col, Container } from 'reactstrap';
import QuantitySelector from './quantity-selector';

const imageStyles = { width: '150px', height: '150px' };
const layoutStyles = { display: 'flex', alignItems: 'center' };
type CartItemProps = {
    name: string;
    price: number;
    image: string;
    quantity: number;
    onDecrement: () => void;
    onIncrement: () => void;
};
const CartItem: FunctionComponent<CartItemProps> = props => {
    const { name, price, image, quantity, onDecrement, onIncrement } = props;

    return (
        <Row style={{ margin: '10px 0' }}>
            <Col>
                <img style={imageStyles} src={image} />
            </Col>
            <Col style={layoutStyles}>
                <Container>
                    <Col>{name}</Col>
                    <Col style={{ color: 'gray' }}>{price.toFixed(2)}$</Col>
                </Container>
            </Col>
            <Col style={layoutStyles}>
                <QuantitySelector
                    onDecreaseQuantity={onDecrement}
                    onIncreaseQuantity={onIncrement}
                    quantity={quantity}
                />
            </Col>
            <Col style={layoutStyles}>{(quantity * price).toFixed(2)}$</Col>
        </Row>
    );
};

export default CartItem;
