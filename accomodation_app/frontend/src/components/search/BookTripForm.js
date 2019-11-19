import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderKeyboardDatePicker } from '../../utils/renderFormComponents';

class BookTripForm extends Component {

  state = {
    isOpen: false
  };

  closeCheckin = () => {
    this.setState({isOpen: true});

  }

  closeCheckOut = () => {
    this.setState({isOpen: false});
  }

  openCheckout = () => {
    this.setState({isOpen: true});
  }

  render () {
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
            onClose={this.closeCheckin}
          />
        </div>
        <div>
          <Field
            name="checkOut"
            id="checkOut"
            label="Check Out"
            variant="inline"
            open={this.state.isOpen}
            component={renderKeyboardDatePicker}
            shouldDisableDate={this.props.disableBeforeCheckin}
            onAccept={this.props.setCheckout}
            onMonthChange={this.props.changeMonthHandler}
            onOpen={this.openCheckout}
            onClose={this.closeCheckOut}
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