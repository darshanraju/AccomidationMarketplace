import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderKeyboardDatePicker } from '../../utils/renderFormComponents';

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
          />
        </div>
        <div>
          <Field
            name="checkOut"
            label="Check Out"
            variant="inline"
            component={renderKeyboardDatePicker}
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