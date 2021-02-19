import { client } from "../createApolloClient";
import { SET_ORDER } from "../graphql";

export const saveOrderData = async (emailAddress, product, quantity) => {
  const orderItem = { ...product, quantity };
  // FIXME: Where is this coming from?
  delete orderItem.__typename;

  const orderData = {
    emailAddress,
    orderItems: [orderItem],
  };

  await client.mutate({
    mutation: SET_ORDER,
    variables: { orderData },
  });

  // NOTE: this is not examining the actual response
  return true;
};
