import React from 'react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './createApolloClient'

import { TopBar } from './components'
import { Products } from './pages'
import './styles/styles.css'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <TopBar />
      <Products />
    </ApolloProvider>
  )
}

export default App