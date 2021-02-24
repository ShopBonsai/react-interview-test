import React, {Component} from 'react'
import { Provider } from "react-redux";
import {ApolloProvider} from 'react-apollo';
import apolloClient from './createApolloClient';
import {Container, Row, Col} from 'reactstrap';
import store from "./redux/store";
import Products from './components/Products';
import NavBarApp from './components/NavBarApp';
import Cart from './components/Cart';
import Notifier from './components/Notifier';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <NavBarApp/>
                    <Notifier/>
                    <Container fluid={true}>
                        <Row style={{ marginTop: '65px' }}>
                            <Col xs="9">
                                <Products/>
                            </Col>
                            <Col xs="3" style={{ zIndex: 0 }}>
                                <Cart/>
                            </Col>
                        </Row>
                    </Container>
                </Provider>
            </ApolloProvider>
        )
    }
}

export default App;
