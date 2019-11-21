import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
//import Dropzone from 'react-dropzone-uploader';
import ImageUploader from 'react-images-upload';

import FieldFileInput, { renderTextField } from '../../utils/renderFormComponents';

class AddPropertyForm extends Component {
  state = {
    pictures: []
  };

  onDrop = (picture) => {
    this.setState({ pictures: picture });
  }

  render() {
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
          <div><Field name="images" component={FieldFileInput} /></div>
          <Button type="submit">Submit</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default reduxForm({ form: 'addProperty' })(AddPropertyForm);