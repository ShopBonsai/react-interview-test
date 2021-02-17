import * as React from "react";

import { useState } from "./index";

// small function to perform state reactions
// ie. functions that perform some global side effect when something in state changes

export function useReactions() {
  const [state, dispatch] = useState();

  // anytime the JWT changes we want to refresh user data
  React.useEffect(() => {
    dispatch({ type: "REFRESH_USER" });
  }, [state.auth.jwt]);
}
