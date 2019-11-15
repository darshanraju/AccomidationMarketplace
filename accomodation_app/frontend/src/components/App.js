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
import { compose } from 'redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import HomePage from './HomePage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import TripsPage from './TripsPage';
import ProfilePage from './ProfilePage';
import ManageProperty from './properties/ManageProperty';
import AddProperty from './properties/AddProperty';
import PropertiesPage from './properties/PropertiesPage';
import LoginPage from './accounts/LoginPage';
import RegisterPage from './accounts/RegisterPage';
import SearchPage from './search/SearchPage';
import ViewProperty from './search/ViewProperty';
import ViewTrip from './ViewTrip';


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
    const { classes } = this.props;
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
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/search/view" component={ViewProperty} />
              <Route exact path="/trips/view" component={ViewTrip} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/profile" component={ProfilePage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/trips" component={TripsPage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/properties" component={PropertiesPage} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/properties/manage" component={ManageProperty} />
              <ProtectedRoute isAllowed={this.props.auth.loggedIn} exact path="/properties/add" component={AddProperty} />
              <ProtectedRoute isAllowed={!this.props.auth.loggedIn} exact path="/register" component={RegisterPage} />
              <ProtectedRoute isAllowed={!this.props.auth.loggedIn} exact path="/login" component={LoginPage} />
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

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(App);