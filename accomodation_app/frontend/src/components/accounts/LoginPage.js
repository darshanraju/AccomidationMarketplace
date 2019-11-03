import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { loginUser } from '../../actions';
import LoginPageForm from './LoginPageForm';

class LoginPage extends Component {
  submit = (formValues) => {
    this.props.loginUser(formValues);
  }

  render() {
    return (
      <React.Fragment>
        <LoginPageForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

export default compose(
  connect(null, { loginUser }),
  withRouter
)(LoginPage);