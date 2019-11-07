import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { searchProperties } from '../actions';
import HomeSearchForm from './search/HomeSearchForm';

class HomePage extends Component {
  submit = (formValues) => {
    const parameters = {
      suburb: "Cabramatta",
      checkIn: "2019-05-05",
      checkOut: "2019-06-06" 
    }
    console.log(formValues);
    this.props.searchProperties(parameters);
  }

  render () {
    return (
      <Box display="flex" flexDirection="column" component={Paper} width={1/4} m={10} p={2} elevation={3}>
        <HomeSearchForm onSubmit={this.submit} />
      </Box>
    )
  }
}

export default connect(null, { searchProperties })(HomePage);