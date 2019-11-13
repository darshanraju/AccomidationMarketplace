import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

class ManagePropertyForm extends Component {
  handleUpdateProperty = () => {
    console.log('Update the property');
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div><Field name="address" component={renderTextField} label="Address" /></div>
          <div><Field name="suburb" component={renderTextField} label="Suburb" /></div>
          <div><Field name="postcode" component={renderTextField} label="Postcode" /></div>
          <div><Field name="price" component={renderTextField} label="Price" /></div>
          <div><Field name="no_guests" component={renderTextField} label="Number of Guests" /></div>
          <div><Field name="no_beds" component={renderTextField} label="Number of Beds" /></div>
          <div><Field name="no_bathrooms" component={renderTextField} label="Number of Bathrooms" /></div>
          <Button type="submit" disabled={pristine || submitting}>Update</Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</Button>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.uProperties.selectedProperty,
    enableReinitialize: true
  };
};

export default connect(mapStateToProps)(reduxForm({ form: 'manageProperty' })(ManagePropertyForm));