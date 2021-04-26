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

interface IPurchase {
  products: IProduct[];
  price: number;
}

interface IPurchaseData {
  purchase: IPurchase;
}

const purchases: IPurchase[] = [];

/************************************************************************
 * Saves purchase to backend
 * @param _root - Root value. Undefined by default
 * @param data  - Data containing purchase information
 * @returns     - Returns true when purchase was computed successfully
 ***********************************************************************/
export const makePurchase = (_root: undefined, data: IPurchaseData) => {
  const { purchase } = data;
  purchases.push(purchase);
  return true;
};
