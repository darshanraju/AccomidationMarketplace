import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Field, reduxForm } from 'redux-form';

import { 
  renderTextField,
  renderKeyboardDatePicker,
  renderSelectField,
  numericOptions
} from '../../utils/renderFormComponents';

class SearchOptions extends Component {
  render () {
    return (
      <Paper elevation={3} component={Box} p={1} m={1}>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="suburb" component={renderTextField} label="Suburb" />
          <Field
            name="checkIn"
            label="Check In"
            variant="inline"
            component={renderKeyboardDatePicker}
          />
          <Field
            name="checkOut"
            label="Check Out"
            variant="inline"
            component={renderKeyboardDatePicker}
          />
          <Field
            name="guests"
            label="Guests"
            component={renderSelectField}
          >
            {numericOptions()}
          </Field>
          <Field
            name="beds"
            label="Beds"
            component={renderSelectField}
          >
            {numericOptions()}
          </Field>
          <Field
            name="bathrooms"
            label="Bathrooms"
            component={renderSelectField}
          >
            {numericOptions()}
          </Field>
          <Button variant="contained" type="submit">Apply</Button>
        </form>
      </Paper>
    )
  }
}

export default reduxForm({form: 'searchOptions'})(SearchOptions);