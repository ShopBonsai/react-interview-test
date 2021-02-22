import React, { useState } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media
} from "reactstrap";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";
import { BUY_PRODUCT } from "../mutations";
import Dropdown from "./Dropdown";

import "./styles.css";

const Product = ({
  id,
  image,
  name,
  price,
  color,
  size,
  description,
  quantity = 0
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [buyProduct] = useMutation(BUY_PRODUCT);

  const handleQuantitySelect = ({ target: { value } }) => {
    setSelectedQuantity(parseInt(value, 10));
  };

  const handleClickBuy = () => {
    buyProduct({ variables: { id, quantity: selectedQuantity } });
  };

  return (
    <Media className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        {quantity ? (
          <div className="flex mx-4 items-center">
            <Button onClick={handleClickBuy} color="primary" size="lg" block>
              Buy
            </Button>
            <div className="mx-2">
              <Dropdown
                quantity={quantity}
                selectedQuantity={selectedQuantity}
                handleSelect={handleQuantitySelect}
              />
            </div>
          </div>
        ) : (
          <div className="flex mx-4">No more items...</div>
        )}
      </CardBody>
    </Media>
  );
};

const Products = () => {
  const { loading, error, data: { products = [] } = {} } = useQuery(
    GET_PRODUCTS
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div>
        Something unexpected happened... Maybe refreshing will get it back to
        the expected state?
      </div>
    );
  }

  return (
    <div>
      {products.map(product => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
