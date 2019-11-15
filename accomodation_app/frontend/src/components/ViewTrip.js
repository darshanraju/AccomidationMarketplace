import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import UpdateTripForm from './UpdateTripForm';
import ReviewTripForm from './ReviewTripForm'
import { updateTrip, reviewTrip } from '../actions';



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


  render() {
    const selectedTrip = this.props.userTrips.selectedTrip || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedTrip.id}</Typography>
        <Typography variant="subtitle2">Checkin: {selectedTrip.checkin}</Typography>
        <Typography variant="subtitle2">Checkout: {selectedTrip.checkout}</Typography>
        <Typography variant="subtitle2">Guests: {selectedTrip.no_guests} people</Typography>
        {this.canUpdateTrip(selectedTrip.checkout) && <UpdateTripForm onSubmit={this.submit} />}
        {!this.canUpdateTrip(selectedTrip.checkout) && <ReviewTripForm onSubmit={this.submitReview} />}

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { userTrips: state.userTrips };
};

export default connect(mapStateToProps, { updateTrip, reviewTrip })(ViewTrip);