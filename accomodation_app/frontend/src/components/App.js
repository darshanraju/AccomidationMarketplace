import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';

import HomePage from './HomePage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Properties from './Properties';
import Trips from './Trips';
import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <HashRouter>
          <NavBar />
          {this.props.auth.loggedIn && <SideBar />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/trips" component={Trips} />
            <Route exact path="/properties" component={Properties} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);