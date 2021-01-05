import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { connect } from "react-redux";
import { setNotification } from "../actions/notificationAction";
import { addToCart, increasetItemQty, decreaseItemQty } from "../actions/cartAction";
import QuantityIndicators from './QuantityIndicators';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';

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
  constructor(props){
    super(props);
    this.state = {
      products: {}
    };

    this.addItemToCart = this.addItemToCart.bind(this);
    this.handleQtyIncrease = this.handleQtyIncrease.bind(this);
    this.handleQtyDecrease = this.handleQtyDecrease.bind(this);
  }

  addItemToCart(item){
    this.props.addToCart(item);
    this.props.setNotification(`${item.name} has been added to cart.`);
  }

  handleQtyIncrease(item){
    this.props.increasetItemQty(item);
  }

  handleQtyDecrease(item){
    this.props.decreaseItemQty(item);
  }

  showProducts() {
    const { merchants, merchantsLoading } = this.props;
    
    if (!merchantsLoading && merchants && merchants.length > 0) {
      return merchants.map(({products}) => {
        return products && products.length > 0 && products.map(product => {
          const { color, description, image, name, price, size, quantity } = product
          
          return (
            <Media key={product.id} className="product-card">
            <Media left href="#">
              <Media object src={image} alt="Product image cap" />
              </Media>
              <CardBody>
                <CardTitle style={{fontWeight: 600}}>{name} ({quantity})</CardTitle>
                <CardTitle>Price: {price}</CardTitle>
                <CardSubtitle>Color: {color}</CardSubtitle>
                <CardSubtitle>Size: {size}</CardSubtitle>
                <CardText>Details: {description}</CardText>
                
                {
                  this.props.cartItems[product.id] && this.props.cartItems[product.id].qty > 0 &&
                  <QuantityIndicators
                    product={product}
                    increaseQty={this.handleQtyIncrease}
                    cartItem={this.props.cartItems[product.id]}
                    decreaseQty={this.handleQtyDecrease}
                  />
                }
                <Button 
                  block
                  size="lg"
                  color="primary" 
                  disabled={((this.props.cartItems[product.id] && this.props.cartItems[product.id].qty >= quantity) || !!this.props.cartItems[product.id])}
                  onClick={() => this.addItemToCart(product)}
                >Add To Cart</Button>
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
};

const productsListData = withProducts(ProductsList);

const mapStateToProps = (state) =>({
	cartItems: state.cart.items,
});

const mapDispatchToProps = {
  addToCart,
  decreaseItemQty,
  increasetItemQty,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(productsListData);