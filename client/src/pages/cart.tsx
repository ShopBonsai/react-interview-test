import React, { FunctionComponent, useState } from 'react';
import { Row, Col, Button, Container, Alert } from 'reactstrap';
import { useQuery, gql, useMutation } from '@apollo/client';
import '../components/styles.css';
import { GET_CART } from '../components/cart-total';
import CartItem from '../components/cart-item';
import FadeLoader from 'react-spinners/FadeLoader';
import { colors } from '../styles';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CheckOutButton from '../components/checkout-button';
import requireAuth from '../requireAuth';

export const UPDATE_CART = gql`
    mutation UpdateCartMutation(
        $updateCartProductId: String!
        $updateCartQuantity: Int!
    ) {
        updateCart(
            productId: $updateCartProductId
            quantity: $updateCartQuantity
        ) {
            success
            message
            cart {
                userId
                items {
                    id
                    name
                    image
                    price
                    quantity
                }
            }
        }
    }
`;

type CartItem = {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
};

type CartProps = {
    cartItems: [CartItem];
    cartLoading: boolean;
};

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const withCartItems = Component => props => {
    const { data, loading, error } = useQuery(GET_CART, {
        fetchPolicy: 'network-only',
    });
    if (loading) {
        return (
            <Container style={containerStyles}>
                <PacmanLoader color={colors.primary} />
            </Container>
        );
    }
    if (error) {
        return (
            <Container style={containerStyles}>
                Sorry, your cart is unavailable at the moment. Please try again
                later.
            </Container>
        );
    }
    return (
        <Component
            cartLoading={loading}
            cartItems={
                data && data.cart && data.cart.cart && data.cart.cart.items
            }
            {...props}
        />
    );
};
const Cart: FunctionComponent<CartProps> = (props: CartProps) => {
    const [updateCart, { loading, data, error }] = useMutation(UPDATE_CART, {
        update(cache, { data: { updateCart } }) {
            cache.writeQuery({
                query: GET_CART,
                data: { cart: updateCart },
            });
        },
    });
    const [visible, setVisible] = useState(error ? true : false);

    const onDismiss = () => setVisible(false);
    const showCartItems = () => {
        const { cartItems, cartLoading } = props;

        if (!cartLoading && cartItems && cartItems.length > 0) {
            return (
                <div>
                    <Alert color="info" isOpen={visible} toggle={onDismiss}>
                        Sorry, We could not update your cart. Please try again
                        later!
                    </Alert>
                    <Row style={{ padding: '15px' }}>
                        <Col sm={{ size: 6 }}>Product</Col>
                        <Col>Quantity</Col>
                        <Col>Total</Col>
                    </Row>
                    <div>
                        {cartItems.map(cartItem => {
                            return (
                                <CartItem
                                    key={cartItem.id}
                                    name={cartItem.name}
                                    image={cartItem.image}
                                    quantity={cartItem.quantity}
                                    price={cartItem.price}
                                    onDecrement={() => {
                                        updateCart({
                                            variables: {
                                                updateCartProductId:
                                                    cartItem.id,
                                                updateCartQuantity:
                                                    cartItem.quantity - 1,
                                            },
                                        });
                                    }}
                                    onIncrement={() => {
                                        updateCart({
                                            variables: {
                                                updateCartProductId:
                                                    cartItem.id,
                                                updateCartQuantity:
                                                    cartItem.quantity + 1,
                                            },
                                        });
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div>
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
                                <CheckOutButton
                                    total={cartItems
                                        .reduce((a, b) => {
                                            return a + b.quantity * b.price;
                                        }, 0)
                                        .toFixed(2)}
                                />
                            )}
                        </Row>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>No products added to cart yet</h3>
                </div>
            );
        }
    };

    return <div className="cart">{showCartItems()}</div>;
};
export default requireAuth(withCartItems(Cart));
