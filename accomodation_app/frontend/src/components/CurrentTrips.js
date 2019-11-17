import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { fetchUserTrips, deleteTrip, updateTrip, sortCurrentTrips } from '../actions/index';
import { Typography, Collapse } from '@material-ui/core';
import UpdateTripForm from './UpdateTripForm';

const styles = (theme) => ({
  item: {
    width: "50%"
  },
  card: {
    padding: theme.spacing(0.5, 0.5)
  },
  textRight: {
    "text-align": "right"
  }
})

class CurrentTrips extends Component {
  state = {
    expanded: []
  };

  async componentDidMount() {
    await this.props.fetchUserTrips();
    this.props.sortCurrentTrips();
  };

  handleExpansion = (index) => {
    const new_expanded = this.state.expanded.slice();
    if (new_expanded[index]) {
      new_expanded[index] = false;
    } else {
      new_expanded[index] = true;
    }
    this.setState({ expanded: new_expanded })
  }

  handleUpdate = async (formValues, booking_id) => {
    await this.props.updateTrip(formValues, booking_id);
    await this.props.fetchUserTrips();
    this.handleExpansion(booking_id);
    this.props.sortCurrentTrips();
  }

  handleDelete = async (booking_id) => {
    console.log('delete pressed');
    await this.props.deleteTrip(booking_id);
    this.props.sortCurrentTrips();
  }

  dateParser(date) {
    var [year, month, day] = date.split('-');
    return day + '/' + month + '/' + year;
  }

  render() {
    var trips = this.props.userTrips.currentTrips || [];
    const { classes } = this.props;
    return (
      <Grid container spacing={3} direction="column" alignItems="center">
        {trips.map((trip) => (
          <Grid item key={trip.booking.id} className={classes.item}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="subtitle2" className={classes.textRight}>
                  {this.dateParser(trip.booking.checkin)}
                </Typography>
                <Typography variant="subtitle2" className={classes.textRight}>
                  {'to ' + this.dateParser(trip.booking.checkout)}
                </Typography>
                <Typography variant="subtitle2">
                  {trip.property.address}
                </Typography>
                <Typography variant="subtitle2">
                  {trip.property.suburb + ', NSW, ' + trip.property.postcode}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => this.handleExpansion(trip.booking.id)}
                >
                  Change Dates
                </Button>
                <Button
                  onClick={() => this.handleDelete(trip.booking.id)}
                >
                  Cancel Trip
                </Button>
              </CardActions>
              <Collapse in={this.state.expanded[trip.booking.id]} timeout="auto" unmountOnExit>
                <UpdateTripForm onSubmit={(formValues) => this.handleUpdate(formValues, trip.booking.id)} />
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userTrips: state.userTrips
  }
}

export default compose(
  connect(mapStateToProps, { fetchUserTrips, deleteTrip, updateTrip, sortCurrentTrips }),
  withStyles(styles)
)(CurrentTrips);