import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';

import { Loader } from './Loader';
import { MerchantTile } from './MerchantTile';

export const GET_PRODUCTS = gql`
    {
        merchants {
            guid
            merchant
            companyDescription
            logo
            publishedState
            products {
                id
                name
                price
                description
                color
                size
                quantity
                image
            }
        }
    }
`;

const withProducts = (Component) => (props) => {
    return (
        <Query query={GET_PRODUCTS}>
            {({ loading, data }) => {
                return (
                    <Component
                        merchantsLoading={loading}
                        merchants={data && data.merchants}
                        {...props}
                    />
                );
            }}
        </Query>
    );
};

class ProductsList extends Component {
    showProducts() {
        const { merchants, merchantsLoading } = this.props;

        if (!merchantsLoading && merchants && merchants.length > 0) {
            return merchants.map((merchant) => {
                return <MerchantTile key={merchant.guid} data={merchant} />;
            });
        } else {
            return <Loader />;
        }
    }

    render() {
        return <div>{this.showProducts()}</div>;
    }
}
export default withProducts(ProductsList);
