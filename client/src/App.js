import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFoundPage from './components/404';
import { Provider } from "react-redux";
import ProductsList from './components/Products';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import NavigationBar from './components/NavBar';
import Notification from './components/Notification';
import './styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <NavigationBar />
            <Notification />
            <Switch>
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/" render={(props) => (<ProductsList {...props}/>)} />
              <Route component={NotFoundPage} />
            </Switch>
        </Provider>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App;