import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searchProperties, fetchSearchProperty, fetchSearchPropertyFeatures, fetchSearchPropertyReviews, bookedDates, ownerContactInfo } from '../../actions';
import SearchOptions from './SearchOptions';

class SearchPage extends Component {
  submit = async (formValues) => {
    await this.props.searchProperties(formValues);
  }

  handleOnClick = async (id, e) => {
    await this.props.fetchSearchProperty(id);
    var today = new Date();
    await this.props.bookedDates(id, today);
    await this.props.fetchSearchPropertyFeatures(id);
    await this.props.fetchSearchPropertyReviews(id);
    await this.props.ownerContactInfo(id);
    this.props.history.push('/search/view');
  }

  render () {
    return (
      <React.Fragment>
        <SearchOptions onSubmit={this.submit} />
        <Grid container direction="column" spacing={3}>
          { this.props.sProperties.properties.map((currentProperty) => (
            <Grid item xs={3} key={currentProperty.id}>
              <Paper>
                <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
                <Typography variant="subtitle2">Bathrooms: {currentProperty.no_bathrooms}</Typography>
                <Typography variant="subtitle2">Fits: {currentProperty.no_guests} people</Typography>
                <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
                <Button onClick={(e) => this.handleOnClick(currentProperty.id, e)}>View</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    sProperties: state.sProperties
  };
};

export default compose(
  connect(mapStateToProps, { searchProperties, fetchSearchProperty, fetchSearchPropertyFeatures, fetchSearchPropertyReviews, bookedDates, ownerContactInfo}),
  withRouter
)(SearchPage);