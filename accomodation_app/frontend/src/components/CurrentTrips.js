import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { fetchUserTrips, deleteTrip, updateTrip, sortCurrentTrips, bookedDates } from '../actions/index';
import { Typography, Collapse } from '@material-ui/core';
import UpdateTripForm from './UpdateTripForm';

var checkin_date = null;
var checkout_date = null;
var nextbookingstart = null;

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

  handleExpansion = (index, property_id) => {
    const new_expanded = this.state.expanded.slice();
    if (new_expanded[index]) {
      new_expanded[index] = false;
    } else {
      new_expanded[index] = true;
    }
    this.setState({ expanded: new_expanded })
    var today = new Date();
    this.props.bookedDates(property_id, today);
    checkin_date = null;
    checkout_date = null;
    nextbookingstart = null;
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

    setCheckin = (date) => {
    checkin_date = Date.parse(date);
    nextbookingstart = this.NextBooking();
    this.calculatePrice();
  }

  setCheckout = (date) => {
    checkout_date = Date.parse(date);
    this.calculatePrice();
  }

  AlreadyBooked(date) {
    var list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if ((format(date, 'yyy-MM-dd') == list[i][1]) || (format(date, 'yyy-MM-dd') == list[i][0])){
        return true;
      }
      if (date < Date.parse(list[i][1]) && date > Date.parse(list[i][0])){
        return true;
      }
    }
    return false;
  }

  NextBooking(){
    var list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if (checkin_date < Date.parse(list[i][0])){
        return Date.parse(list[i][0]);
      }
    }
    return null;
  }
  AfterNextBooking(date){
    //console.log(nextbookingstart);
    if (nextbookingstart == null){
      //console.log("no next booking");
      return false;
    }
    if (format(date, 'yyy-MM-dd') == format(nextbookingstart, 'yyy-MM-dd')){
      return true;
    }
    if (date > nextbookingstart){
      return true;
    }
    return false;
  }

  disableBeforeCheckin = (date) => {
    if (checkin_date == null){
      if (this.AlreadyBooked(date) == true){
        return true;
      }
    } else { 
      if (this.AfterNextBooking(date) == true){
        return true;
      }
    }
    return date < checkin_date;
  }

  disableAfterCheckout = (date) => {
    if (this.AlreadyBooked(date) == true){
      return true;
    }
    //return date > checkout_date;
  }

  getMonthBookings(date, id){ //(date)
    return this.props.bookedDates(id, date);
  }

  resetLookup(id){ //()
    var today = new Date();
    this.props.bookedDates(id, today);
  }

  resetAfterOpen(id){ //()
    var today = new Date();
    this.props.bookedDates(id, today);
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
                  onClick={() => this.handleExpansion(trip.booking.id, trip.booking.property_id)}
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
                <UpdateTripForm 
                  changeMonthHandler={(date) => this.getMonthBookings(date, trip.booking.property_id)} 
                  setCheckin={this.setCheckin} 
                  setCheckout={this.setCheckout} 
                  disableBeforeCheckin={this.disableBeforeCheckin}
                  disableAfterCheckout={this.disableAfterCheckout} 
                  resetLookup={() => this.resetLookup(trip.booking.property_id)}
                  resetAfterOpen={()=> this.resetAfterOpen(trip.booking.property_id)}
                  onSubmit={(formValues) => this.handleUpdate(formValues, trip.booking.id)} 
                />
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
    userTrips: state.userTrips,
    sProperties: state.sProperties 
  }
}

export default compose(
  connect(mapStateToProps, { fetchUserTrips, deleteTrip, updateTrip, sortCurrentTrips, bookedDates}),
  withStyles(styles)
)(CurrentTrips);