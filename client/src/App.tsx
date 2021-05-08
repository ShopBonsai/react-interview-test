import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import { Products, Cart, Nav } from './components';

import './styles.css';

const App: React.FC = () => {
  return (
    <Fragment>
      <Nav />
      <Cart />
      <ApolloProvider client={apolloClient}>
        <Products />
      </ApolloProvider>
    </Fragment>
  );
};

export default App;
