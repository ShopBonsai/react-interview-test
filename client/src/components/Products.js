import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { GET_CART_PRODUCTS } from './Cart';
import GTMConstants from '../helpers/GTMConstants';

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
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $productId: String!
    $name: String!
    $price: Float!
    $color: String!
    $size: String!
  ) {
    addToCart(
      productId: $productId
      name: $name
      price: $price
      color: $color
      size: $size
    ) {
      productId
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
  
      if (!merchantsLoading && merchants && merchants.length > 0) {
        return merchants.map(({products}) => {
          return products && products.length > 0 && products.map(product => {
            const { color, description, image, name, price, size } = product
            return (
              <Media key={product.id} className="product-card">
              <Media left href="#">
                <Media className="product__image" object src={image} alt="Product image cap" />
                </Media>
                <CardBody>
                  <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
                  <CardTitle>Price: {price}</CardTitle>
                  <CardSubtitle>Color: {color}</CardSubtitle>
                  <CardSubtitle>Size: {size}</CardSubtitle>
                  <CardText>Details: {description}</CardText>
                  <Mutation 
                    mutation={ADD_TO_CART_MUTATION}
                    variables={{ 
                      productId: product.id,
                      name: name,
                      price: price,
                      color: color,
                      size: size,
                    }}
                    refetchQueries={[{ query: GET_CART_PRODUCTS }]}
                  >
                    {(addToCart, { loading, error }) => {
                      return (
                        <Button
                          disabled={loading}
                          color="primary"
                          size="lg"
                          block
                          onClick={addToCart}
                          data-gtmclickid={GTMConstants.EVENT_IDS.BUY}
                        >
                          {loading ? 'Adding to Cart' : 'Buy'}
                        </Button>
                      );
                    }}
                  </Mutation>
                </CardBody>
              </Media>
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
        <div className="products">
          {this.showProducts()}
        </div>
      );
    }
  }
  export default withProducts(ProductsList)