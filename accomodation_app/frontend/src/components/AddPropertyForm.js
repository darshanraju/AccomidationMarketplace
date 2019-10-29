import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';
import { connect, compose } from 'react-redux';

class AddProperty extends Component {
  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit}>
          <div><Field name="address" component={TextField} label="Address" /></div>
          <div><Field name="suburb" component={TextField} label="Suburb" /></div>
          <div><Field name="postcode" component={TextField} label="Postcode" /></div>
          <div><Field name="Price" component={TextField} label="Price" /></div>
          <div><Field name="noGuests" component={TextField} label="Number of Guests" /></div>
          <div><Field name="noBeds" component={TextField} label="Number of Beds" /></div>
          <div><Field name="noBathrooms" component={TextField} label="Number of Bathrooms" /></div>
          <Button type="submit">Submit</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default reduxForm({form: 'addProperty'})(AddProperty);