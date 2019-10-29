import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import HomePage from './HomePage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import PropertiesPage from './PropertiesPage';
import TripsPage from './TripsPage';
import ProfilePage from './ProfilePage';
import ManageProperty from './ManageProperty';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
  },
  contentSidebar: {
    flexGrow: 1,
    paddingLeft: '15vw',
  },
})

const ProtectedRoute = ({ isAllowed, ...props }) => {
  if (isAllowed) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

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
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/profile" component={ProfilePage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/trips" component={TripsPage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/properties" component={PropertiesPage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/properties/manage" component={ManageProperty} />
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