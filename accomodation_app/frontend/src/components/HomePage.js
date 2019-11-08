import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { searchProperties } from '../actions';
import HomeSearchForm from './search/HomeSearchForm';

class HomePage extends Component {
  submit = async (formValues) => {
    await this.props.searchProperties(formValues);
    this.props.history.push('/search');
  }

  render () {
    return (
      <Box display="flex" flexDirection="column" component={Paper} width={1/4} m={10} p={2} elevation={3}>
        <HomeSearchForm onSubmit={this.submit} />
      </Box>
    )
  }
}

export default compose(
  connect(null, { searchProperties }),
  withRouter
)(HomePage);