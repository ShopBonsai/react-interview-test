import React from 'react';
import {
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    CardBody,
    Media,
} from 'reactstrap';

export const ProductCard = ({ data }) => {
    const { color, description, image, name, price, quantity, size } = data;

    return (
        <Media className="product-card">
            <Media left href="#">
                <Media
                    object
                    src={image}
                    alt="Product image cap"
                    className="img-tile"
                />
            </Media>
            <CardBody>
                <CardTitle className="text-title">{name}</CardTitle>
                <CardTitle>Price: ${(price / 100).toFixed(2)}</CardTitle>
                <CardSubtitle>Color: {color}</CardSubtitle>
                <CardSubtitle>Size: {size}</CardSubtitle>
                <CardSubtitle>Quantity: {quantity}</CardSubtitle>
                <CardText>Details: {description}</CardText>
                <Button color="primary" size="lg" block>
                    Buy
                </Button>
            </CardBody>
        </Media>
    );
};
