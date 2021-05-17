import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql, } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import './styles.css';

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

const ADD_TO_CART = gql`
mutation createCart($sessionId: String!,$merchantId: String!,$productId: String!,$quantity: Float!) {
  createCart(
    data: {
      sessionId: $sessionId,
      merchantId:  $merchantId,
      productId: $productId,
      quantity: $quantity
    }
  ){id,products{quantity,productId,merchantId}}
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
        return merchants.map(({guid,products}) => {
          return products && products.length > 0 && products.map(product => {
            const { color, description, image, name, price, size } = product
            return (
              <Media key={product.id} className="product-card">
              <Media left href="#">
                <Media object src={image} alt="Product image cap" />
                </Media>
                <CardBody>
                  <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
                  <CardTitle>Price: {price}</CardTitle>
                  <CardSubtitle>Color: {color}</CardSubtitle>
                  <CardSubtitle>Size: {size}</CardSubtitle>
                  <CardText>Details: {description}</CardText>
                  {/* TODO: quantity shoule come through an input or from incrementing the current count, used a random integer for demo purposes*/}
                  {/* TODO: sessionId should be implemented and stored locally through cookies for example */}
                  <Mutation mutation={ADD_TO_CART} variables={{ sessionId:"test", merchantId:guid , productId:product.id, quantity: Math.floor(Math.random() * 4) }}> 
                    {(createCart, { data, loading, error }) => {
                      if (error) {
                        return (
                          <Button disabled>
                            Failed to add
                          </Button>
                        );
                      }
                      if (loading) {
                        return (
                          <Button disabled>
                            Adding...
                          </Button>
                        );
                      }
                  
                      if(data)
                      {
                        return(
                          
                            <Button onClick={createCart} color="primary" size="lg" block>{data.createCart.products.find(item => item.productId == product.id).quantity} Added to cart </Button>
                           )
                        }
                      else return(
                        <Button onClick={createCart} color="primary" size="lg" block>Buy</Button>
                        );
                    }
                   }
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
        <div>
          {this.showProducts()}
        </div>
      );
    }
  }
  export default withProducts(ProductsList)