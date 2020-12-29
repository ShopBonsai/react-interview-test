import React, { Fragment, Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './createApolloClient';
import Products from './pages/products';
import Cart from './pages/cart';

import { Router } from '@reach/router';
import PageContainer from './components/page-container';
import Footer from './components/footer';
import Header from './components/header';
import Profile from './pages/profile';
import Login from './pages/login';
class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Header />
                <PageContainer>
                    <Router primary={false} component={Fragment}>
                        <Products path="/" />
                        <Cart path="/cart" />
                        <Profile path="/profile" />
                        <Login path="/login" />
                    </Router>
                </PageContainer>
                <Footer />
            </ApolloProvider>
        );
    }
}

export default App;
