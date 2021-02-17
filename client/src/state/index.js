import * as React from "react";

import { initialState, hydrateState } from "./state";
import { reducer } from "./reducer";
import { useReactions } from "./reactions";

// Here is a home brew state management that leverages React Context and reducers
// functions similar to Redux using actions with less boiler plate

const Context = React.createContext({
  state: initialState,
  dispatch: () => initialState,
});

const Reactions = ({ children }) => {
  useReactions();
  return children;
};

export const Provider = ({ children, apolloClient }) => {
  const [state, setState] = React.useState(hydrateState(apolloClient));

  // this custom dispatch allows us to use async function inside of our reducer
  const dispatch = async (action) => {
    const result = await reducer(state, action);
    setState(result);
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Reactions>{children}</Reactions>
    </Context.Provider>
  );
};

export function useState() {
  const ctx = React.useContext(Context);
  return [ctx.state, ctx.dispatch];
}
