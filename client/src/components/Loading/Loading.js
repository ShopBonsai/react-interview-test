import React from "react";
import { Spinner, Jumbotron } from "reactstrap";
import "./styles.css";

const Loading = () => (
  <Jumbotron className="loading">
    <h4>
      <Spinner />
      Loading...
    </h4>
  </Jumbotron>
);

export default Loading;