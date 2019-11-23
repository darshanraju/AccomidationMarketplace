import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../actions';
import LoginPageForm from './LoginPageForm';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    marginTop: '200px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    marginTop: '30px',
    lineHeight: '30px',
    textAlign: 'center',
  }
})


class LoginPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <h1 className="text-center">Login</h1>
        <LoginPageForm />
        <div className={classes.text}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(null, { loginUser }),
  withRouter,
  withStyles(styles)
)(LoginPage);