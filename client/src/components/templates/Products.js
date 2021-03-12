import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import './Products.css';
import { LoadingArea } from '../organisms/LoadingArea';

const GET_PRODUCTS = gql`
  query GetProducts {
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

const GET_PRODUCTS_BY_MERCHANT = gql`
  query GetProductsByMerchant($guid: String!) {
    merchant(guid: $guid) {
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

const DELETE_PRODUCT_WITH_ID = gql`
  mutation DeleteProductWithId(
    $id: String!
  ) {
    deleteProductWithId(
      id: $id
    )
  }
`;

const withProducts = Component => props => {
  const { merchantGuid } = props;
  return (
    <Query query={merchantGuid ? GET_PRODUCTS_BY_MERCHANT : GET_PRODUCTS} variables={{
      guid: merchantGuid,
    }}>
      {({ loading, data }) => {
        const merchants = data && (data.merchants || [data.merchant]);
        return (
          <div>
            <Component merchantsLoading={loading} merchants={merchants} {...props} />
          </div>
        );
      }}
    </Query>
  );
};

const withDeleteProductWithId = Component => props => {
  return (
    <Mutation mutation={DELETE_PRODUCT_WITH_ID} refetchQueries={['GetProducts', 'GetProductsByMerchant']}>
      {(deleteProductWithId) => {
        return (
          <Component deleteProductWithId={deleteProductWithId} {...props} />
        )
      }}
    </Mutation>
  )
}

class ProductsList extends Component {

    hasProductsToShow() {
      const { merchants } = this.props;
      if (!merchants) {
        return false;
      }
      for (const merchant of merchants) {
        for (const _ of merchant.products) {
          return true;
        }
      }
      return false;
    }

    removeProduct(product) {
      const { deleteProductWithId } = this.props;
      deleteProductWithId({
        variables: {
          id: product.id
        },
      });
      console.log('deleted?', product)
    }
  
    showProducts() {
      const { merchants, merchantGuid } = this.props;

      const handleRemove = (product) => this.removeProduct(product);

      return merchants.map(({ guid, products }) => {
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
                <Button color="primary" size="lg" block>Buy</Button>
                {
                  (merchantGuid && merchantGuid === guid) && (
                    <Button color="secondary" size="sm" block onClick={() => handleRemove(product)}>Remove</Button>
                  )
                }
              </CardBody>
            </Media>
          );
        })
      }); 
    } 

    render() {
      const { merchants, merchantsLoading } = this.props;
  
      if (merchantsLoading) {
        return (
          <LoadingArea />
        );
      } else if (this.hasProductsToShow()) {
        return this.showProducts();
      } else {
        return (
          <div>
            <strong>No products available</strong>
          </div>
        );
      }
    }
  }

export default withProducts(withDeleteProductWithId(ProductsList))