import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { fetchProperty } from '../actions';
import AddPropertyForm from './AddPropertyForm';

class ManageProperty extends Component {
  submit = (values) => {
    console.log(values);
  }

  render () {
    return (
      <React.Fragment>
        <AddPropertyForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

export default ManageProperty;