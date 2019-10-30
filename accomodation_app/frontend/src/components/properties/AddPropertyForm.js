import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

class AddProperty extends Component {
  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit}>
          <div><Field name="address" component={renderTextField} label="Address" /></div>
          <div><Field name="suburb" component={renderTextField} label="Suburb" /></div>
          <div><Field name="postcode" component={renderTextField} label="Postcode" /></div>
          <div><Field name="price" component={renderTextField} label="Price" /></div>
          <div><Field name="no_guests" component={renderTextField} label="Number of Guests" /></div>
          <div><Field name="no_beds" component={renderTextField} label="Number of Beds" /></div>
          <div><Field name="no_bathrooms" component={renderTextField} label="Number of Bathrooms" /></div>
          <Button type="submit">Submit</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default reduxForm({form: 'addProperty'})(AddProperty);