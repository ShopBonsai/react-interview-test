import React, { useContext, useReducer } from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './createApolloClient';
import Context from './context';
import reducer from './reducer';
import Products from './components/Products';

const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApolloProvider client={apolloClient}>
      <Context.Provider value={{ state, dispatch }}>
        <Products />
      </Context.Provider>
    </ApolloProvider>
  )
}

export default App;