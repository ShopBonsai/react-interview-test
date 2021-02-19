import { client } from "../createApolloClient";
import { SET_NOTIFICATION } from "../graphql";

export const saveNotificationRequest = async (notification) => {
  await client.mutate({
    mutation: SET_NOTIFICATION,
    variables: { notification },
  });

  // NOTE: this is not examining the actual response
  return true;
};
