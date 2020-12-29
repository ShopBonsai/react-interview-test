import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { colors } from '../styles';

export const GET_CART = gql`
    query Query {
        cart {
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
            success
        }
    }
`;
const CartTotal: FunctionComponent = () => {
    const { data, loading, error } = useQuery(GET_CART);

    if (loading) {
        return null;
    }

    if (error) {
        return <span>Cart total unavailable. Please try again later</span>;
    }

    const noOfItemsInCart =
        data.cart.cart != null
            ? data.cart.cart.items.reduce((a, b) => {
                  return a + b.quantity;
              }, 0)
            : 0;
    return <span style={{ color: colors.primary }}>({noOfItemsInCart})</span>;
};

export default CartTotal;
