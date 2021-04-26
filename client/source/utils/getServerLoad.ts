import { gql } from "@apollo/client";
import client from "../createApolloClient";

const ADD_ACCESS = gql`
  mutation addDatabaseAccess($loadTime: Int!) {
    addDatabaseAccess(loadTime: $loadTime) {
      accessCount
    }
  }
`;

let timer = 0;
let firstPass = false;

export const timerStart = () => {
  timer = Date.now();
  firstPass = true;
};

export const timerEnd = () => {
  if (firstPass) { 
    const result = Date.now() - timer;
    client.mutate({
      mutation: ADD_ACCESS,
      variables: {
        loadTime: result,
      },
    });
  }
};
