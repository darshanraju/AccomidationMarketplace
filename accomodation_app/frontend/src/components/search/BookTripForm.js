import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { renderKeyboardDatePicker } from '../../utils/renderFormComponents';

class BookTripForm extends Component {

  state = {
    isOpen: false
  };

  closeCheckin = () => {
    this.setState({ isOpen: true });

  }

  closeCheckOut = () => {
    this.setState({ isOpen: false });
  }

  openCheckout = () => {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Grid container justify="flex-start" alignItems="flex-end" spacing={5}>
          <Grid item>
            <Field
              name="checkIn"
              label="Check In"
              variant="inline"
              margin="normal"
              component={renderKeyboardDatePicker}
              shouldDisableDate={this.props.disableAfterCheckout}
              onAccept={this.props.setCheckin}
              onMonthChange={this.props.changeMonthHandler}
              onClose={() => { this.setState({ isOpen: true }); }}
            />
          </Grid>
          <Grid item>
            <Field
              name="checkOut"
              id="checkOut"
              label="Check Out"
              variant="inline"
              margin="normal"
              open={this.state.isOpen}
              component={renderKeyboardDatePicker}
              shouldDisableDate={this.props.disableBeforeCheckin}
              onAccept={this.props.setCheckout}
              onMonthChange={this.props.changeMonthHandler}
              onOpen={() => { this.setState({ isOpen: true }); }}
              onClose={() => { this.setState({ isOpen: false }); }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">Book</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}


export default reduxForm({
  form: 'bookTripForm',
})(BookTripForm);