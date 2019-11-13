import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';

import { 
  renderTextField,
  renderKeyboardDatePicker,
  renderSelectField,
  numericOptions,
  renderCheckbox,
} from '../../utils/renderFormComponents';

var checkin_date = Date.now();
var checkout_date;
var open = false;

function setCheckin(date) {
  checkin_date = Date.parse(date);
}

function setCheckout(date) {
  checkout_date = Date.parse(date);
}

function disableBeforeCheckin(date) {
  return date < checkin_date;
}

function disableAfterCheckout(date) {
  return date > checkout_date;
}

function expand(){
  console.log("expand button pressed");
  open = !open;
  console.log(open);
}

function getOpen(){
  return open
}

class SearchOptions extends Component {

  render () {
    return (
      <Paper elevation={3} component={Box} p={1} m={1}>
        <form onSubmit={this.props.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item>
              <Grid container direction="column">
                <Field name="suburbOrPostcode" component={renderTextField} label="Suburb or Postcode" />
                <Field
                  name="checkIn"
                  label="Check In"
                  variant="inline"
                  component={renderKeyboardDatePicker}
                  shouldDisableDate={disableAfterCheckout}
                  onAccept={(date) => setCheckin(date)}
                />
                <Field
                  name="checkOut"
                  label="Check Out"
                  variant="inline"
                  component={renderKeyboardDatePicker}
                  shouldDisableDate={disableBeforeCheckin}
                  onAccept={(date) => setCheckout(date)}
                />
                <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />}>Search</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Field
                name="guests"
                label="Guests"
                component={renderSelectField}
              >
                {numericOptions()}
              </Field>
            </Grid>
            <Grid item>
              <Field
                name="beds"
                label="Beds"
                component={renderSelectField}
              >
                {numericOptions()}
              </Field>
            </Grid>
            <Grid item>
              <Field
                name="bathrooms"
                label="Bathrooms"
                component={renderSelectField}
              >
                {numericOptions()}
              </Field>
            </Grid>
            <Grid item> 
              <Field
                name="Pool"
                label="Pool"
                component={renderCheckbox}
              />
              <Field
                name="Aircon"
                label="Air Conditioner"
                component={renderCheckbox}
              />
              <Field
                name="Wifi"
                label="Wifi"
                component={renderCheckbox}
              />
              <Field
                name="FreeParking"
                label="Free Parking"
                component={renderCheckbox}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
  }

  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }
}

export default reduxForm({form: 'searchOptions'})(SearchOptions);