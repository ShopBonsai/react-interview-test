export {};

import React from "react";
import { IProduct } from "../../../../interfaces/IProduct";
import { gql, useQuery } from "@apollo/client";
import { IMerchant } from "../../../../interfaces/IMerchant";
import { defaultProduct } from "../../utils/defaultProduct";

interface IProductsContext {
  products: IProduct[];
  filteredProducts: IProduct[];
  loading: boolean;
  error: boolean;
  getProduct: (id: string) => IProduct | undefined;
  removeProduct: (id: string) => IProduct | false;
  checkStock: (id: string, quan?: number) => IProduct | false;
  updateStock: (
    id: string,
    quan?: number,
    remove?: boolean
  ) => IProduct | false;
  setFilteredProducts: (filter?: string) => void;
}

const GET_PRODUCTS = gql`
  query {
    merchants {
      index
      guid
      publishedState
      merchant
      products {
        id
        name
        price
        description
        color
        size
        quantity
        image
      }
    }
  }
`;

interface IQuery {
  merchants: IMerchant[];
}

const ProductsContext: React.Context<IProductsContext> = React.createContext<IProductsContext>(
  {
    products: [defaultProduct],
    filteredProducts: [defaultProduct],
    loading: true,
    error: false,
    getProduct: (id: string) => defaultProduct,
    removeProduct: (id: string) => defaultProduct,
    checkStock: (id: string, quan: number = 1) => false,
    updateStock: (id: string, quan: number = 1) => false,
    setFilteredProducts: () => null,
  }
);

export const ProductsContextProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;

  const { loading, error: fetchError, data } = useQuery<IQuery>(GET_PRODUCTS);

  /********************************************
   * @todo - Implement error handling component
   ********************************************/
  const error = Boolean(fetchError);

  const [products, setProducts] = React.useState<IProduct[]>([]);

  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>(
    []
  );

  const [filter, setFilter] = React.useState<string>("");

  /*******************************************
   * Resets products to default values
   ******************************************/
  const getDefaultProducts = () => {
    if ((data?.merchants?.length ?? 0) > 0) {
      const productList: IProduct[] = [];
      data?.merchants.forEach((merchant: IMerchant) => {
        if (merchant.publishedState) {
          merchant.products.forEach((product: IProduct) => {
            productList.push({ ...product, merchant: merchant.index! });
          });
        }
      });
      return productList;
    }
    return [];
  };

  /**********************************************************
   * If data has been recovered from the database, populates
   * the internal products array
   **********************************************************/
  React.useEffect(() => {
    const products = getDefaultProducts();
    if (products?.length > 0) setProducts(products);
  }, [data]);

  /******************************************************************
   * Everytime the products are updated,
   * the filtered products shown on screen should be updated as well
   ******************************************************************/
  React.useEffect(() => {
    filterProducts();
  }, [products]);

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const removeProduct = (id: string) => {
    const index = products.findIndex((product) => product.id === id);
    if (index < -1) {
      return false;
    }

    const newProducts = [...products];
    const removedProduct = newProducts.splice(index, 1);
    setProducts(newProducts);
    return removedProduct[0];
  };

  /************************************************************************
   * Filters products array based on input
   * @param filter - Input string to filter by
   * @returns      - Returns an array of filtered (or unfiltered) products
   ***********************************************************************/
  const filterProducts = (newFilter?: string) => {
    if (newFilter) {
      setFilter(newFilter);
    }
    const filteredList = products.filter((product) =>
      product.name.toLowerCase().includes((newFilter ?? filter).toLowerCase())
    );
    setFilteredProducts(filteredList);
  };

  /*****************************************************************
   * Checks if a certain item is in stock so it can be purchased
   * @param id   - Product iD
   * @param quan - Number of products being purchased
   * @returns    - The product if it is in stock, false if it isn't
   *****************************************************************/
  const checkStock = (id: string, quan: number = 1) => {
    if (quan <= 0) {
      return false;
    }

    const product = getProduct(id);
    if (!product) {
      return false;
    }

    if (product.quantity < quan) {
      return false;
    }

    return product;
  };

  /****************************************************************
   * Updates the products array when a product is changed
   * @param id   - Product ID
   * @param quan - Quantity to be subtracted
   * @returns    - The updated product if found, false if it isn't
   ****************************************************************/
  const updateProduct = (id: string, quan: number, remove: boolean = true) => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1 && remove) {
      return false;
    }
    const newProducts = [...products];

    if (index !== -1) {
      const updatedProduct = {
        ...products[index],
        quantity: remove
          ? products[index].quantity - quan
          : products[index].quantity + quan,
      };
      newProducts[index] = updatedProduct;
      setProducts(newProducts);
      return updatedProduct;
    }

    const allProducts = getDefaultProducts();
    if (allProducts) {
      const newIndex = allProducts.findIndex((product) => product.id === id);
      if (newIndex !== -1) {
        const newProduct = { ...allProducts[newIndex], quantity: quan };
        newProducts.splice(newIndex, 0, newProduct);
        setProducts(newProducts);
        return newProduct;
      }
    }

    return false;
  };

  /*************************************************************************
   * Updates the stock of a product, so that the stock is updated when a
   * product is purchased
   * @param id   - Product ID
   * @param quan - Product quantity to remove from stock
   * @returns    - The updated product if it is in stock, false if it isn't
   *************************************************************************/
  const updateStock = (
    id: string,
    quan: number = 1,
    remove: boolean = true
  ) => {
    const product = checkStock(id, quan);
    if (!product && remove) {
      return false;
    }
    if (remove && product) {
      const newProduct = { ...product, quantity: product.quantity - quan };

      if (newProduct.quantity === 0) {
        return removeProduct(id);
      }
    }

    return updateProduct(id, quan, remove);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        error,
        getProduct,
        removeProduct,
        checkStock,
        updateStock,
        setFilteredProducts: filterProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => React.useContext(ProductsContext);
