import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BookTripForm from './BookTripForm';
import { bookProperty, bookedDates } from '../../actions';

var checkin_date = Date.now();
var checkout_date;

class ViewProperty extends Component {

  submit = (formValues) => {
    this.props.bookProperty(formValues, this.props.sProperties.selectedProperty.id);
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
    return this.props.bookedDates(this.props.sProperties.selectedProperty.id, date);
  }

  resetLookup = () => {
    var today = new Date();
    this.props.bookedDates(this.props.sProperties.selectedProperty.id, today)
  }
  
  render () {
    const selectedProperty = this.props.sProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedProperty.id}</Typography>
        <Typography variant="subtitle2">Bathrooms: {selectedProperty.no_bathrooms}</Typography>
        <Typography variant="subtitle2">Fits: {selectedProperty.no_guests} people</Typography>
        <Typography variant="subtitle2">Price: ${selectedProperty.price}/night</Typography>
        <BookTripForm 
          changeMonthHandler={this.getMonthBookings} 
          setCheckin={this.setCheckin} 
          setCheckout={this.setCheckout} 
          disableBeforeCheckin={this.disableBeforeCheckin}
          disableAfterCheckout={this.disableAfterCheckout} 
          resetLookup={this.resetLookup}
          onSubmit={this.submit} 
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { sProperties: state.sProperties };
};

export default connect(mapStateToProps, { bookProperty, bookedDates })(ViewProperty);