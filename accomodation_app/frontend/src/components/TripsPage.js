import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { fetchUserTrip, fetchUserTrips, deleteTrip } from '../actions/index';
import Button from '@material-ui/core/Button';
import accommodation from '../apis/accommodation';

import { Switch, Route, Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CurrentTrips from './CurrentTrips';
import PreviousTrips from './PreviousTrips';

class TripsPage extends Component {
  state = { value: '/trips' };

  handleTabChange = (value) => {
    this.setState({ value: value });
  };

  render() {
    return (
      <React.Fragment>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            label="Current"
            value="/trips"
            component={Link} to="/trips"
            onClick={() => this.handleTabChange('/trips')}
          />
          <Tab
            label="Previous"
            value="/trips/previous"
            component={Link} to="/trips/previous"
            onClick={() => this.handleTabChange('/trips/previous')}
          />
        </Tabs>
        <Switch>
          <Route exact path="/trips">
            <CurrentTrips />
          </Route>
          <Route exact path="/trips/previous">
            <PreviousTrips />
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userTrips: state.userTrips,
    auth: state.auth
  };
};


export default connect(mapStateToProps, { fetchUserTrips, deleteTrip, fetchUserTrip })(TripsPage);
