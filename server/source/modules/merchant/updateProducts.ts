import { merchants } from "../../mockMerchantData";

interface IProduct {
  belongsToBrand: number;
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
  merchant: number;
}

interface IUpdateProductsData {
  products: IProduct[];
}

/*************************************************************************
 * Updates the database based on products returned by the frontend
 * @param _root - Root Value. Undefined by default
 * @param data  - Mutation data containing product information
 * @returns     - Updated merchant database
 * @todo        - Refactor code so that only changed products are handled
 *************************************************************************/
export const updateProducts = (_root: undefined, data: IUpdateProductsData) => {
  const { products } = data;
  merchants.forEach((merchant) => {
    const newProducts = products.filter(
      (product) => merchant.index === product.merchant
    );
    merchant.products = newProducts;
  });
  return merchants;
};
