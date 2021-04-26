export {};

import * as React from "react";
import { IProduct } from "../../../../interfaces/IProduct";
import { defaultProduct } from "../../utils/defaultProduct";

interface IShoppingCartContext {
  products: IProduct[];
  addToCart: (product: IProduct, quan?: number) => IProduct;
  removeFromCart: (id: string, quan?: number) => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const ShoppingCartContext: React.Context<IShoppingCartContext> = React.createContext<IShoppingCartContext>(
  {
    products: [defaultProduct],
    addToCart: (product: IProduct, quan: number = 1) => defaultProduct,
    removeFromCart: (id: string, quan: number = 1) => 0,
    getTotalPrice: () => 0.0,
    clearCart: () => null,
  }
);

export const ShoppingCartContextProvider: React.FC<React.ReactNode> = (
  props
) => {
  const { children } = props;

  const [products, setProducts] = React.useState<IProduct[]>([]);

  const getProductIndex = (id: string) => {
    return products.findIndex((product) => id === product.id);
  };

  /************************************************************************
   * Adds a quantity of products to the cart. If the product is already
   * in the cart, its quantity is updated. Otherwise, the product is added.
   * @param product - Product to be added
   * @param quan    - Quantity to be added
   * @returns       - Product that was changed or added to cart
   *************************************************************************/
  const addToCart = (product: IProduct, quan: number = 1) => {
    const index = getProductIndex(product.id);
    const newProducts = [...products];
    if (index !== -1) {
      newProducts[index].quantity += quan;
      setProducts(newProducts);
      return newProducts[index];
    }
    const newProduct = { ...product, quantity: quan };
    newProducts.push(newProduct);
    setProducts(newProducts);
    return newProduct;
  };

  /**********************************************************
   * Identifies a product in the cart by its ID and removes
   * from it the quantity provided
   * @param id   - Product ID
   * @param quan - Quantity to be removed
   * @returns    - -1 if no product is found in the cart,
   *                remaining quantity otherwise
   **********************************************************/
  const removeFromCart = (id: string, quan: number = 1) => {
    const index = getProductIndex(id);
    const newProducts = [...products];
    if (index === -1) {
      return -1;
    }

    if (newProducts[index].quantity <= quan) {
      newProducts.splice(index, 1);
      setProducts(newProducts);
      return 0;
    }
    newProducts[index].quantity -= quan;
    setProducts(newProducts);
    return newProducts[index].quantity;
  };

  const getTotalPrice = () => {
    return products.reduce(
      (totalPrice, product) => totalPrice + product.quantity * product.price,
      0
    );
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useCart = () => React.useContext(ShoppingCartContext);
