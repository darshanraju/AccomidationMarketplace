import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderKeyboardDatePicker } from '../../utils/renderFormComponents';

var checkin_date = Date.now();
var checkout_date;
var bD = [];

function setCheckin(date) {
  checkin_date = Date.parse(date);
}

function setCheckout(date) {
  checkout_date = Date.parse(date);
}

function disableBeforeCheckin(date) {
  console.log(date);
  return date < checkin_date;
}

function disableAfterCheckout(date) {
  return date > checkout_date;
}

class BookTripForm extends Component {

  render () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field
            name="checkIn"
            label="Check In"
            variant="inline"
            component={renderKeyboardDatePicker}
            shouldDisableDate={disableAfterCheckout}
            onAccept={(date) => setCheckin(date)}
            onMonthChange={this.props.changeMonthHandler(date)}
          />
        </div>
        <div>
          <Field
            name="checkOut"
            label="Check Out"
            variant="inline"
            component={renderKeyboardDatePicker}
            shouldDisableDate={disableBeforeCheckin}
            onAccept={(date) => setCheckout(date)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Book</Button>
      </form>
    )
  }
}


export default reduxForm({
  form: 'bookTripForm',
})(BookTripForm);