import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderKeyboardDatePicker } from '../utils/renderFormComponents';

class UpdateTripForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field
            name="checkIn"
            label="Check In"
            variant="inline"
            component={renderKeyboardDatePicker}
            shouldDisableDate={this.props.disableAfterCheckout}
            onAccept={this.props.setCheckin}
            onMonthChange={this.props.changeMonthHandler}
            onClose={this.props.resetLookup}
          />
        </div>
        <div>
          <Field
            name="checkOut"
            label="Check Out"
            variant="inline"
            component={renderKeyboardDatePicker}
            shouldDisableDate={this.props.disableBeforeCheckin}
            onAccept={this.props.setCheckout}
            onMonthChange={this.props.changeMonthHandler}
            onClose={this.props.resetLookup}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Update</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'UpdateTripForm',
})(UpdateTripForm);