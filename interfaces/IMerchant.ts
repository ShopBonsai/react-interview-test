import { IProduct } from "./IProduct";

export interface IMerchant {
  index: number;
  publishedState: boolean;
  products: IProduct[];
}
