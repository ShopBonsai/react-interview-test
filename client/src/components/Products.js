import React, { useState, useContext } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media, Spinner } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Context from '../context';
import ProgressiveImage from './ProgressiveImage';
import FancyInput from './FancyInput';
import Card from './Cart';
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

const ProductsList = () => {
  const [productFilter, setProductFilter] = useState('');
  const { loading, data } = useQuery(GET_PRODUCTS);
  const { state, dispatch } = useContext(Context);
  const { productsInCart } = state;
  let merchants;
  if (loading) return <div className="container"><h4> <Spinner />Hold your horses mate, we are loading awesome stuff here.</h4></div>
  if (data) merchants = data.merchants;
  return (
    <>
      <div className="container">
        <FancyInput placeholder="Filter by product name" onChange={({ target: { value }}) => setProductFilter(value)} />
      </div>
      <Card />
      {data ? (
        <div className="container product-container">
          {merchants.map(({ products }) => (
            products.filter(product =>
              product.name.toLowerCase().includes(productFilter.toLowerCase())).map(({ id, color, description, image, name, price, size }) => (
                <Media key={id} className="product-card">
                  <Media left href="#">
                    <ProgressiveImage src={image} />
                  </Media>
                  <CardBody>
                    <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
                    <CardTitle>Price: {price}</CardTitle>
                    <CardSubtitle>Color: {color}</CardSubtitle>
                    <CardSubtitle>Size: {size}</CardSubtitle>
                    <CardText>Details: {description}</CardText>
                    <Button 
                      id={id}
                      name={name}
                      image={image}
                      className="buy" 
                      color="primary" 
                      size="lg" 
                      block
                      onClick={({ target: { id }}) => dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: { id, name, image } })}
                      disabled={productsInCart.some(product => product.id === id)}
                    >
                      Buy
                    </Button>
                  </CardBody>
                </Media>
              )
            )
          ))}
        </div>
      ) : (
        <p>something isn't quite right</p>
      )}
    </>
  )
}

export default ProductsList;