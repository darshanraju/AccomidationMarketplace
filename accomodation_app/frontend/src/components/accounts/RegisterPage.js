import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { registerUser } from '../../actions';
import RegisterPageForm from './RegisterPageForm';



class RegisterPage extends Component {
  submit = (formValues) => {
    this.props.registerUser(formValues) //How to make this async
    // console.log("INSIDE SUBMITE: ", this.props)
    // console.log(this.props.auth.errorMessage.length)
    // console.log(this.props.auth.errorMessage)
    if (this.props.auth.errorMessage.length == 0) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <React.Fragment>
        <RegisterPageForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default compose(
  connect(mapStateToProps, { registerUser }),
  withRouter
)(RegisterPage);