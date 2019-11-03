import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { registerUser } from '../../actions';
import RegisterPageForm from './RegisterPageForm';

class RegisterPage extends Component {
  submit = (formValues) => {
    this.props.registerUser(formValues);
    this.props.history.push('/login');
  }

  render() {
    return (
      <React.Fragment>
        <RegisterPageForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

export default compose(
  connect(null, { registerUser }),
  withRouter
)(RegisterPage);