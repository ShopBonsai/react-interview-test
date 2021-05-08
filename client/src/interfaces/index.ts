export interface IState {
  merchants: IMerchants[];
  cart: ICart;
}
export interface IAction {
  type: string;
  payload?: any;
}
export interface RootState {
  shop: IState;
}
export interface IMerchants {
  guid: string;
  merchant: string;
  products: IProducts[];
  __typename: string;
}
export interface IProducts {
  id: string;
  image: string;
  name: string;
  price: number;
  color: string;
  size: string;
  description: string;
  __typename: string;
}
export interface ICart {
  current: ICartProducts[];
  isOpen: boolean;
  itemCount: number;
  subTotal: number;
}
export interface ICartProducts extends IProducts {
  selectedQuantity: number;
}
