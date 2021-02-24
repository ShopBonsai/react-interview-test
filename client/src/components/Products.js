import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Product from './Product';
import { Spinner } from 'reactstrap';
import GET_PRODUCTS from '../graphql/queries/getProducts';
import './styles.css';


const withProducts = Component => props => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return (
            <div className='center-spinner'>
                <Spinner color="primary"/>
            </div>
        )
        if (error) return <div>Error ☠️</div>
        return (
            <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }
  showProducts() {
      const { merchants, merchantsLoading } = this.props;

      if (!merchantsLoading && merchants && merchants.length > 0) {
        return merchants.map(({products}) => {
          return products && products.length > 0 && products.map(product => {
            return (
                <Product key={product.id}
                         addToCart={this.addItem}
                         product={product}/>
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
  export default withProducts(ProductsList);
