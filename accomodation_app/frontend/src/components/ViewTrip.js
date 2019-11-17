import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import UpdateTripForm from './UpdateTripForm';
import ReviewTripForm from './ReviewTripForm'
import { updateTrip, reviewTrip, bookedDates } from '../actions';

var checkin_date = Date.now();
var checkout_date;

class ViewTrip extends Component {
  submit = (formValues) => {
    this.props.updateTrip(formValues, this.props.userTrips.selectedTrip.id);
  }

  submitReview = (formValues) => {
    this.props.reviewTrip(formValues, this.props.userTrips.selectedTrip.id);
  }

  canUpdateTrip(dateStr) {
    if (dateStr == undefined) {
      return true
    }
    var [checkoutYear, checkoutMonth, checkoutDay] = dateStr.split("-")
    var intCheckOutMonth = Number(checkoutMonth)
    intCheckOutMonth = intCheckOutMonth - 1
    var checkOut = new Date(checkoutYear, intCheckOutMonth, checkoutDay)
    var today = new Date();
    return (checkOut > today)
  }

  setCheckin = (date) => {
    checkin_date = Date.parse(date);
  }

  setCheckout = (date) => {
    checkout_date = Date.parse(date);
  }

  AlreadyBooked(date) {
    const list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if (date <= Date.parse(list[i][1]) && date >= Date.parse(list[i][0])){
        return true;
      }
    }
    return false;
  }

  disableBeforeCheckin = (date) => {
    console.log(date);
    if (this.AlreadyBooked(date) == true){
      return true;
    }
    return date < checkin_date;
  }

  disableAfterCheckout = (date) => {
    if (this.AlreadyBooked(date) == true){
      return true;
    }
    return date > checkout_date;
  }

  getMonthBookings = (date) =>{
    return this.props.bookedDates(this.props.userTrips.selectedTrip.property_id, date);
  }

  resetLookup = () => {
    var today = new Date();
    this.props.bookedDates(this.props.userTrips.selectedTrip.property_id, today)
  }


  render() {
    const selectedTrip = this.props.userTrips.selectedTrip || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedTrip.id}</Typography>
        <Typography variant="subtitle2">Checkin: {selectedTrip.checkin}</Typography>
        <Typography variant="subtitle2">Checkout: {selectedTrip.checkout}</Typography>
        <Typography variant="subtitle2">Guests: {selectedTrip.no_guests} people</Typography>
        {this.canUpdateTrip(selectedTrip.checkout) && <UpdateTripForm changeMonthHandler={this.getMonthBookings} setCheckin={this.setCheckin} setCheckout={this.setCheckout} disableBeforeCheckin={this.disableBeforeCheckin} disableAfterCheckout={this.disableAfterCheckout} resetLookup={this.resetLookup} onSubmit={this.submit} />}
        {!this.canUpdateTrip(selectedTrip.checkout) && <ReviewTripForm onSubmit={this.submitReview} />}

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    userTrips: state.userTrips,
    sProperties: state.sProperties  
  };
};

export default connect(mapStateToProps, { updateTrip, reviewTrip, bookedDates })(ViewTrip);