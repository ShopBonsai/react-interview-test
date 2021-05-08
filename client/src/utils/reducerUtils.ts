import { toFixedNumber } from './utils';

export const cartCalculator = (arr) => {
  const { itemCount, subTotal } = arr.reduce(
    (acc, item) => {
      acc.itemCount = acc.itemCount + item.selectedQuantity;
      acc.subTotal = acc.subTotal + item.price * item.selectedQuantity;
      return acc;
    },
    { itemCount: 0, subTotal: 0 },
  );
  return {
    itemCount,
    subTotal: toFixedNumber(subTotal),
  };
};
