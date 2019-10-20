import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import HomePage from './HomePage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Properties from './Properties';
import Trips from './Trips';
import Profile from './Profile';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
  },
  contentSidebar: {
    flexGrow: 1,
    paddingLeft: '15vw',
  },
})

class App extends Component {
  render() {
    const {classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <HashRouter>
          <NavBar />
          {this.props.auth.loggedIn && <SideBar />}
          <main 
            className={clsx(classes.content, {
              [classes.contentSidebar]: this.props.auth.loggedIn,
            })}
          >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/trips" component={Trips} />
              <Route exact path="/properties" component={Properties} />
            </Switch>
          </main>
        </HashRouter>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(withStyles(styles)(App));