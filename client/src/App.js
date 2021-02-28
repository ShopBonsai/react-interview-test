import React from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './createApolloClient'
import Products from './components/Products'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Products />
    </ApolloProvider>
  )
}

export default App