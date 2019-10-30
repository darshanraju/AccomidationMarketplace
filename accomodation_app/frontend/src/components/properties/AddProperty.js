import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addProperty } from '../../actions';
import AddPropertyForm from './AddPropertyForm';

class ManageProperty extends Component {
  submit = (formValues) => {
    this.props.addProperty(formValues);
    this.props.history.push('/properties');
  }

  render () {
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
)(ManageProperty);