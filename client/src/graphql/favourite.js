import { gql } from "apollo-boost";

export const SET_FAVOURITES = gql`
  mutation saveUserFavourites($userFavourites: UserFavourites) {
    favourite(userFavourites: $userFavourites)
  }
`;
