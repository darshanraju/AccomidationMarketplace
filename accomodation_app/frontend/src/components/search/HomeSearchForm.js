import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from 'date-fns/locale/en-AU';
import { format, addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { renderTextField, renderKeyboardDatePicker } from '../../utils/renderFormComponents';

class HomeSearchForm extends Component {
  render () {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale} >
        <form onSubmit={this.props.handleSubmit}>
          <div><Field name="suburb" component={renderTextField} label="Suburb" /></div>
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
      </MuiPickersUtilsProvider>
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