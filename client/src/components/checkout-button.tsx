import React, { useState, FunctionComponent } from 'react';
import { navigate } from '@reach/router';
import { Button } from 'reactstrap';
import { gql, useMutation } from '@apollo/client';
import { GET_CART } from './cart-total';
import { colors } from '../styles';
import { GET_ORDERS } from '../pages/profile';

export const CREATE_ORDER = gql`
    mutation CreateOrder {
        createOrder {
            success
            message
        }
    }
`;

type CheckOutButtonProps = {
    total: string;
};

const CheckOutButton: FunctionComponent<CheckOutButtonProps> = ({ total }) => {
    const [createOrder, { loading, data }] = useMutation(CREATE_ORDER, {
        update(cache, { data: { createOrder } }) {
            const { cart } = cache.readQuery({
                query: GET_CART,
            });
            cache.writeQuery({
                query: GET_CART,
                data: {
                    cart: {
                        cart: {
                            ...cart.cart,
                            cartItems: [],
                        },
                    },
                },
            });
        },
        onCompleted() {
            navigate('/profile', { replace: true });
        },
    });

    return (
        <Button
            style={{
                backgroundColor: colors.primary,
                border: 'none',
            }}
            size="lg"
            block
            onClick={() => {
                createOrder();
            }}
        >
            <span>Checkout: {total}$</span>
        </Button>
    );
};

export default CheckOutButton;
