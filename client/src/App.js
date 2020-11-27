import TagManager from 'react-gtm-module';
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import Cart from './components/Cart';
import GTMConstants from './helpers/GTMConstants'
import './styles.css';

const tagManagerArgs = {
  gtmId: GTMConstants.GTM_CONTAINER_ID,
};

TagManager.initialize(tagManagerArgs);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <main className="react-interview-container">
          <Cart />
          <Products />
        </main>
      </ApolloProvider>
    )
  }
}

export default App;