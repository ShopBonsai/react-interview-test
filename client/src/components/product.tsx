import React, { useState, FunctionComponent } from 'react';
import { Product as ProductInterface } from '../pages/products';
import {
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    CardBody,
    Media,
    Row,
} from 'reactstrap';
import QuantitySelector from './quantity-selector';
import { gql, useMutation } from '@apollo/client';
import { GET_CART } from './cart-total';
import { colors } from '../styles';
import FadeLoader from 'react-spinners/FadeLoader';

export const ADD_TO_CART = gql`
    mutation AddToCartMutation(
        $addToCartProductId: String!
        $addToCartQuantity: Int!
    ) {
        addToCart(
            productId: $addToCartProductId
            quantity: $addToCartQuantity
        ) {
            success
            cart {
                userId
                items {
                    name
                    quantity
                }
            }
        }
    }
`;

type ProductProps = {
    product: ProductInterface;
};

const Product: FunctionComponent<ProductProps> = props => {
    const { id, color, description, image, name, price, size } = props.product;
    const [quantity, setQuantity] = useState(0);
    const [addToCart, { loading, data }] = useMutation(ADD_TO_CART, {
        update(cache, { data: { addToCart } }) {
            cache.writeQuery({
                query: GET_CART,
                data: { cart: addToCart },
            });
        },
    });

    const decreaseQuantity = () => {
        setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

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
                <QuantitySelector
                    onDecreaseQuantity={decreaseQuantity}
                    onIncreaseQuantity={increaseQuantity}
                    quantity={quantity}
                />
                <Row
                    style={{
                        display: 'flex',
                        margin: '20px 0',
                        justifyContent: 'center',
                    }}
                >
                    {loading ? (
                        <span>
                            <FadeLoader radius={1} color="#000" />
                        </span>
                    ) : (
                        <Button
                            style={{
                                backgroundColor: colors.primary,
                                border: 'none',
                            }}
                            size="lg"
                            block
                            onClick={() => {
                                addToCart({
                                    variables: {
                                        addToCartProductId: id,
                                        addToCartQuantity: quantity
                                            ? quantity
                                            : 1,
                                    },
                                });
                                setQuantity(0);
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </Row>
            </CardBody>
        </Media>
    );
};

export default Product;
