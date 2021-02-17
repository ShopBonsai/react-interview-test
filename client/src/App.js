import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { NavHeader, ProductsList, Login, Signup } from "./components";
import { createApolloClient } from "./helpers";
import { Provider as AppStateProvider } from "./state";

import "./tailwind.css";

const App = () => {
  const apollo = createApolloClient();
  return (
    <ApolloProvider client={apollo}>
      <AppStateProvider apolloClient={apollo}>
        <BrowserRouter>
          <div className="bg-gray-50 h-screen oveflow-x-scroll">
            <NavHeader />

            <Switch>
              <Route path="/products" component={ProductsList} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route render={() => <Redirect to="/products" />} />
            </Switch>
          </div>
        </BrowserRouter>
      </AppStateProvider>
    </ApolloProvider>
  );
};

export default App;
