import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import UserList from './pages/UserList';
import User from './pages/User';

import NotFound from './pages/NotFound'

class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route exact path="/users/:userId">
            <User />
          </Route>

          {/** 404 */}  
          <Route exact path="/*">
            <NotFound />
          </Route>
        </Switch>
    )
  }
}

export default Routes;