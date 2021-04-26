import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { IProduct } from "../../../../../interfaces/IProduct";
import { useCart } from "../../../context/shoppingcart-context";
import cartIcon from "./images/cartIcon.jpeg";
import { MainDiv, CartIcon, ProductList } from "./style";
import { gql, useMutation } from "@apollo/client";
import { useProducts } from "../../../context/products-context";

const MAKE_PURCHASE = gql`
  mutation makePurchase($products: [ProductInput]!, $purchase: PurchaseInput!) {
    updateProducts(products: $products) {
      merchant
    }
    makePurchase(purchase: $purchase) {
      products {
        belongsToBrand
      }
    }
  }
`;

const ShoppingCart: React.FC = () => {
  const [showModal, setModal] = React.useState(false);
  const { products: allProducts, updateStock } = useProducts();
  const [makePurchase] = useMutation(MAKE_PURCHASE);
  const { products, clearCart, removeFromCart, getTotalPrice } = useCart();

  const toggleModal = () => setModal(!showModal);

  const purchaseHandler = () => {
    if ((products?.length ?? 0) > 0) {
      const purchase = { products, price: getTotalPrice() };
      makePurchase({ variables: { products: allProducts, purchase } }).then(
        () => {
          clearCart();
          toggleModal();
          alert("Purchase completed successfully!");
        }
      );
    }
  };
  /****************************
   * Removes product from cart
   * @param id  - Product id
   ***************************/
  const removeHandler = (id: string) => {
    const product = updateStock(id, 1, false);
    if (product) {
      removeFromCart(id);
    }
  };

  /********************************************
   * @todo - Refactor into separate components
   ********************************************/
  let productList: React.ReactNode = (
    <span>Please add some products to your cart!</span>
  );

  if ((products?.length ?? 0) > 0) {
    productList = products.map((product: IProduct) => {
      const { id, name, quantity, price, color, size, description } = product;
      return (
        <ProductList key={id}>
          <CardBody>
            <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
            <CardTitle>Price: {price}</CardTitle>
            <CardSubtitle>Color: {color}</CardSubtitle>
            <CardSubtitle>Size: {size}</CardSubtitle>
            <CardSubtitle>Quantity: {quantity}</CardSubtitle>
            <CardText>Details: {description}</CardText>
            <Button color="primary" size="l" onClick={() => removeHandler(id)}>
              X
            </Button>
          </CardBody>
        </ProductList>
      );
    });
  }

  return (
    <>
      <Modal isOpen={showModal} toggle={toggleModal} size="lg">
        <ModalHeader>Your Shopping Cart</ModalHeader>
        <ModalBody>{productList}</ModalBody>
        <ModalFooter>
          <span>Total Price: ${getTotalPrice().toFixed(2)}</span>
          <Button color="primary" onClick={purchaseHandler}>
            Confirm Purchase!
          </Button>
        </ModalFooter>
      </Modal>
      <MainDiv>
        <CartIcon
          src={cartIcon}
          alt="Click to view your cart!"
          onClick={toggleModal}
        />
      </MainDiv>
    </>
  );
};

export default ShoppingCart;
