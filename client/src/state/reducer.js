import { gql } from "@apollo/client";
import * as BrowserStorage from "../helpers/BrowserStorage";

// State reducer that updates state used in context wrapper
// also stores data in browser storage so we can rehydrate on page refreshes
export async function reducer(state, action) {
  switch (action.type) {
    case "SET_JWT":
      BrowserStorage.save("local", "jwt", action.token);
      return { ...state, auth: { jwt: action.token } };

    case "CLEAR_JWT":
      BrowserStorage.remove("local", "jwt");
      return { ...state, auth: { jwt: null } };

    case "REFRESH_USER":
      if (!state.auth.jwt) {
        BrowserStorage.remove("local", "user");
        return { ...state, user: null };
      }
      const res = await state.apolloClient.query({
        query: gql`
          query GetUser {
            user {
              userId
            }
          }
        `,
      });

      if (res && res.data) {
        return {
          ...state,
          user: res.data.user,
        };
      } else {
        // if no user returned set user state to null
        return {
          ...state,
          jwt: null,
          user: null,
        };
      }
  }
}
