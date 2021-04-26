import { IProduct } from "../../../interfaces/IProduct";

/****************************************************
 * Blank product to use as a placeholder in contexts
 ***************************************************/
export const defaultProduct: IProduct = {
  id: "",
  name: "",
  price: 0.0,
  description: "",
  color: "",
  size: "",
  quantity: 0,
  image: "",
  merchant: 0,
  belongsToBrand: 0,
};
