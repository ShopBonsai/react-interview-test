import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import apolloClient from './createApolloClient';
import { SiteHeader } from './components/organisms/SiteHeader';
import { HomePage } from './pages/HomePage';
import { ManageStorePage } from './pages/ManageStore';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <SiteHeader navLinks={[
            {
              href: '/',
              text: 'Products',
            },
            {
              href: '/manage-store',
              text: 'Manage Store',
            },
          ]} />
          <Container>
            <Row style={{ paddingTop: '48px' }}>
              <Col>
              <Switch>
                <Route path='/manage-store'>
                  <ManageStorePage />
                </Route>
                <Route path='/'>
                  <HomePage />
                </Route>
              </Switch>
              </Col>
            </Row>
          </Container>
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

export default App;