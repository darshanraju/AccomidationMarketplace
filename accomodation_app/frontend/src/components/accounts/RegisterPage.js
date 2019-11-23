import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { registerUser } from '../../actions';
import RegisterPageForm from './RegisterPageForm';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    marginTop: '100px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    marginTop: '30px',
    lineHeight: '30px',
  }
})

class RegisterPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <h1 className="text-center">Register</h1>
        <RegisterPageForm />
        <div className={classes.text}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default compose(
  connect(mapStateToProps, { registerUser }),
  withRouter,
  withStyles(styles)
)(RegisterPage);