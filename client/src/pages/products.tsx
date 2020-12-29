import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';
import '../components/styles.css';
import Product from '../components/product';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { colors } from '../styles';
import requireAuth from '../requireAuth';

export const GET_PRODUCTS = gql`
    {
        merchants {
            guid
            merchant
            products {
                id
                name
                price
                description
                color
                size
                image
            }
        }
    }
`;

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const withProducts = Component => props => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);

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
                Sorry, our store is unavailable at the moment. Please try again
                later.
            </Container>
        );
    }
    return (
        <Component
            merchantsLoading={loading}
            merchants={data && data.merchants}
            {...props}
        />
    );
};

export type Product = {
    color: string;
    description: string;
    image: string;
    name: string;
    price: string;
    size: string;
    id: string;
};

type Merchant = {
    products: [Product];
};

type ProductsListProps = {
    merchantsLoading: boolean;
    merchants: [Merchant];
};

const ProductsList: FunctionComponent<ProductsListProps> = (
    props: ProductsListProps
) => {
    const showProducts = () => {
        const { merchants, merchantsLoading } = props;

        if (!merchantsLoading && merchants && merchants.length > 0) {
            return merchants.map(({ products }) => {
                return (
                    products &&
                    products.length > 0 &&
                    products.map(product => {
                        const {
                            color,
                            description,
                            image,
                            name,
                            price,
                            size,
                        } = product;
                        return <Product key={product.id} product={product} />;
                    })
                );
            });
        } else {
            return (
                <div>
                    <h3>No products available</h3>
                </div>
            );
        }
    };

    return <div>{showProducts()}</div>;
};
export default requireAuth(withProducts(ProductsList));
