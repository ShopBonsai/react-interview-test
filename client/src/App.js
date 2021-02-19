import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';

import Nav from './components/Nav';

import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <Nav/>
          <Routes />
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

export default App;