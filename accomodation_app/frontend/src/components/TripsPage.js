import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { deleteTrip } from '../actions/index'

class TripsPage extends Component {
  render() {
    return (
      <Grid container spacing={3} direction="column">
        {this.props.trips.map((currentTrip) => (
          <Grid item xs={3} key={currentTrip.id}>
            <Paper>
              <Typography variant="subtitle2">Destination: {currentTrip.destination}</Typography>
              <Typography variant="subtitle2">Start Date: {currentTrip.startDate}</Typography>
              <Typography variant="subtitle2">End Date: {currentTrip.endDate}</Typography>
              <button onClick={() => this.props.deleteTrip(currentTrip.id)}>Delete</button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { trips: state.trips };
};

export default connect(mapStateToProps, { deleteTrip })(TripsPage);