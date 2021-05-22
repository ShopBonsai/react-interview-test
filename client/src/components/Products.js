import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';
import { ProductSkeleton, Product } from './';

const GET_PRODUCTS = gql`
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
        quantity
      }
    }
  }
`;

const withProducts = Component => props => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, data }) => {
        return (
          <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

class ProductsList extends Component {
  
    showProducts() {
      const { merchants, merchantsLoading } = this.props;
      if (merchantsLoading) {
				return [...Array(3)].map((elem, i) => <ProductSkeleton key={i}/>)
			}
      if (!merchantsLoading && merchants && merchants.length > 0) {
        return merchants.map(({products}) => {
          return products && products.length > 0 && products.map(product => {
            return (
							<Product
								product={product}
								key={product.id}
								updateCart={this.props.updateCart}
							/>
						);
          })
        });
      } else {
        return (
          <div>
            <h3>No products available</h3>
          </div>
        );
      }
    }
  
    render() {
      return (
        <div>
          {this.showProducts()}
        </div>
      );
    }
  }
  export default withProducts(ProductsList)