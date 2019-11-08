import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fade, withStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { searchProperties } from '../actions';
import SearchBarForm from './search/SearchBarForm';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  }
});

class NavBar extends Component {
  state = {
    searchString: ''
  };

  handleTextFieldChange = (event) => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ searchString: '' })
    }
  };

  submit = async (formValues) => {
    await this.props.searchProperties(formValues);
    this.props.history.push('/search');
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar display="flex">
          <Typography variant="h3">Accomodation App</Typography>
          <Box flexGrow={1} />
          <div className={classes.search}>
            <SearchBarForm type="search" fullWidth onSubmit={this.submit} />
          </div>
          {!this.props.auth.loggedIn && 
            [
              <Button color="inherit" component={NavLink} to="/register" key="register">Register</Button>
              ,
              <Button color="inherit" component={NavLink} to="/login" key="login">Login</Button>
            ]
          }
        </Toolbar>
      </AppBar>
    )
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default compose(
  connect(mapStateToProps, { searchProperties }),
  withRouter,
  withStyles(styles)
)(NavBar);