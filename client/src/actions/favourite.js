import { client } from "../createApolloClient";
import { SET_FAVOURITES } from "../graphql";

export const saveFavourites = async (emailAddress) => {
  const favouriteProductIds = JSON.parse(
    localStorage.getItem("favourites") || JSON.stringify([])
  );
  await client.mutate({
    mutation: SET_FAVOURITES,
    variables: {
      userFavourites: {
        emailAddress,
        favouriteProductIds,
      },
    },
  });
};
