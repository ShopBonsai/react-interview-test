import React from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import "./styles.css";
import { Spinner } from "../UI/Spinner";
import { IProduct } from "../../../../interfaces/IProduct";
import { timerEnd, timerStart } from "../../utils/getServerLoad";
import { useProducts } from "../../context/products-context";
import { useCart } from "../../context/shoppingcart-context";

const ProductsList: React.FC = () => {
  const {
    filteredProducts,
    loading,
    error,
    checkStock,
    updateStock,
  } = useProducts();

  const { addToCart } = useCart();

  const onClickHandler = (id: string) => {
    if (checkStock(id)) {
      const product = updateStock(id);
      if (product) {
        addToCart(product);
      }
    }
  };

  if (loading) {
    timerStart();
    return <Spinner />;
  }

  if (error || !filteredProducts) {
    timerEnd();
    return (
      <div>
        <h3>Could not fetch data!</h3>
      </div>
    );
  }

  if (filteredProducts.length < 1) {
    timerEnd();
    return (
      <div>
        <h3>No products available</h3>
      </div>
    );
  }

  timerEnd();
  return (
    <div className="product-list">
      {filteredProducts.map((product: IProduct) => {
        const {
          color,
          description,
          quantity,
          image,
          name,
          price,
          size,
        } = product;
        return quantity > 0 ? (
          <Media key={product.id} className="product-card">
            <Media left href="#">
              <Media object src={image} alt="Product image cap" />
            </Media>
            <CardBody>
              <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
              <CardTitle>Price: {price}</CardTitle>
              <CardSubtitle>Color: {color}</CardSubtitle>
              <CardSubtitle>Size: {size}</CardSubtitle>
              <CardSubtitle>Stock: {quantity}</CardSubtitle>
              <CardText>Details: {description}</CardText>
              <Button
                color="primary"
                size="lg"
                block
                onClick={() => onClickHandler(product.id)}
              >
                Add to Cart
              </Button>
            </CardBody>
          </Media>
        ) : null;
      })}
    </div>
  );
};

export default ProductsList;
