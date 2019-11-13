import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addDays } from 'date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { renderTextField, renderKeyboardDatePicker } from '../../utils/renderFormComponents';

class HomeSearchForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div><Field name="suburbOrPostcode" component={renderTextField} label="Suburb or Postcode" /></div>
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
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    )
  }
}

const selector = formValueSelector('homeSearchForm');
const mapStateToProps = (state) => {
  const checkInField = selector(state, 'checkIn');
  return { checkInField };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'homeSearchForm',
    initialValues: {
      'checkIn': new Date(), 
      'checkOut': addDays(new Date(), 1)
    }
  })
)(HomeSearchForm);