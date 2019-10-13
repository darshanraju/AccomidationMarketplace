import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import HomePage from './HomePage';
import Register from './accounts/Register';
import Login from './accounts/Login';
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <HashRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));