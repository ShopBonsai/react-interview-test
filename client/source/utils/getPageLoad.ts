import { gql } from "@apollo/client";
import client from "../createApolloClient";

const ADD_VISIT = gql`
  mutation addPageVisit($loadTime: Int!) {
    addPageVisit(loadTime: $loadTime) {
      viewCount
    }
  }
`;

export const getPageLoad = () => {
  const timer = Date.now();

  window.addEventListener("load", () => {
    const result = Date.now() - timer;
    client.mutate({
      mutation: ADD_VISIT,
      variables: {
        loadTime: result,
      },
    });
  });
};
