import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import ProductList from './components/ProductList';
import Product from './screens/Product/Product';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  /*
   * NOTE: Use lazy state initialization, since getting from localStorage
   * could be an expensive-ish operation.
   */
  const [username, setUsername] = React.useState(
    () => window.localStorage.getItem('username') || ''
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Header
          username={username}
          onUsernameInput={e => setUsername(e.target.value)}
        />

        <Switch>
          <Route path="/products/:id">
            <Product />
          </Route>

          <Route path="/">
            <ProductList />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
