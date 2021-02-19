import React from "react";
import { Spinner } from "reactstrap";
export const Loading = () => {
  return (
    <div
      // NOTE: Linting disabled for convenience
      // .. also shame thomas.baxter@gmail.com
      // .... so much shame 😉 .. ring the  🔔especially for
      // the marginTop BS
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "25%",
      }}
    >
      <h3>Loading...</h3>
      <Spinner color="success" type="grow" />
    </div>
  );
};
