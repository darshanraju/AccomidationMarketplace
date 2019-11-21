import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addProperty } from '../../actions';
import AddPropertyForm from './AddPropertyForm';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

class AddProperty extends Component {
  submit = async (formValues) => {
    await this.props.addProperty(formValues)
      .then(() => {
        console.log('Time to upload the images')
        this.props.history.push('/properties');
      })
      .catch(() => {
        console.log('Add Property Form: Invalid inputs')
      })
  }

  render() {
    return (
      <React.Fragment>
        <AddPropertyForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

export default compose(
  connect(null, { addProperty }),
  withRouter
)(AddProperty);