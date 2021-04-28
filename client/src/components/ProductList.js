import React, { Component } from 'react';
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';
import AddToCartButton from './AddToCartButton';
import { Link } from 'react-router-dom';

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant_name
      products {
        id
        product_name
        price
        description
        color
        size
        quantity
        image_url
      }
    }
  }
`;

const withProducts = Component => props => {
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
      return merchants.map(({ products }) => {
        return (
          products &&
          products.length > 0 &&
          products.map(product => {
            const {
              color,
              description,
              image_url,
              product_name,
              price,
              size,
            } = product;
            return (
              <Media key={product.id} className="product-card">
                <Media left href="#">
                  <Media object src={image_url} alt="Product image cap" />
                </Media>
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>
                    {product_name}
                  </CardTitle>
                  <CardTitle>Price: {price}</CardTitle>
                  <CardSubtitle>Color: {color}</CardSubtitle>
                  <CardSubtitle>Size: {size}</CardSubtitle>
                  <CardText>Details: {description}</CardText>
                  <Link to={`/products/${product.id}`}>
                    <Button color="primary" size="lg" block>
                      View
                    </Button>
                    <br />
                  </Link>
                  <AddToCartButton product={product} />
                </CardBody>
              </Media>
            );
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
  }

  render() {
    return <div>{this.showProducts()}</div>;
  }
}
export default withProducts(ProductsList);
