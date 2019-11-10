import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { fetchUserTrips } from '../actions/index';

import accommodation from '../apis/accommodation';

class TripsPage extends Component {
  state = { properties: {} }

  componentDidMount() {
    this.props.fetchUserTrips();
  }

  render() {
    return (
      <Grid container spacing={3} direction="column">
        {this.props.userTrips.trips.map((currentTrip) => (
          <Grid item xs={3} key={currentTrip.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentTrip.property.address}</Typography>
              <Typography variant="subtitle2">Suburb: {currentTrip.property.suburb} Postcode: {currentTrip.property.postcode}</Typography>
              <Typography variant="subtitle2">Check-In: {currentTrip.booking.checkin}</Typography>
              <Typography variant="subtitle2">Check-Out: {currentTrip.booking.checkout}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { userTrips: state.userTrips };
};

export default connect(mapStateToProps, { fetchUserTrips })(TripsPage);