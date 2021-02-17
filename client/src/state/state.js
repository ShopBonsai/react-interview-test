import * as BrowserStorage from "../helpers/BrowserStorage";

export const initialState = {
  apolloClient: null,
  auth: {
    jwt: null,
  },
  user: {
    id: null,
  },
};

// hydrate state from values stored in browser storage
export function hydrateState(apolloClient) {
  return {
    apolloClient,
    auth: {
      jwt: BrowserStorage.read("local", "jwt"),
    },
    user: BrowserStorage.read("local", "user"),
  };
}
