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
  /*
  state = { properties: {} }

  handleOnClick = async (id, e) => {
    await this.props.fetchUserTrip(id);
    this.props.history.push('/trips/view');
  }


  componentDidMount() {
    this.props.fetchUserTrips();
  }

  canUpdateTrip(dateStr) {
    var [checkoutYear, checkoutMonth, checkoutDay] = dateStr.split("-")
    var intCheckOutMonth = Number(checkoutMonth)
    intCheckOutMonth = intCheckOutMonth - 1
    var checkOut = new Date(checkoutYear, intCheckOutMonth, checkoutDay)
    var today = new Date();
    return (checkOut > today)
  }
  */

  /*
        <Grid container spacing={3} direction="column">
        {this.props.userTrips.trips.map((currentTrip) => (
          <Grid item xs={3} key={currentTrip.booking.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentTrip.property.address}</Typography>
              <Typography variant="subtitle2">Suburb: {currentTrip.property.suburb} Postcode: {currentTrip.property.postcode}</Typography>
              <Typography variant="subtitle2">Check-In: {currentTrip.booking.checkin}</Typography>
              <Typography variant="subtitle2">Check-Out: {currentTrip.booking.checkout}</Typography>
              <button onClick={() => {
                this.props.deleteTrip(currentTrip.booking.id)
              }}>Delete</button>
              {
                this.canUpdateTrip(currentTrip.booking.checkout) && <Button onClick={(e) => this.handleOnClick(currentTrip.booking.id, e)}>Update</Button>
              }{
                !this.canUpdateTrip(currentTrip.booking.checkout) && <Button onClick={(e) => this.handleOnClick(currentTrip.booking.id, e)}>Review</Button>
              }

            </Paper>
          </Grid>
        ))}
      </Grid>
  */

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
