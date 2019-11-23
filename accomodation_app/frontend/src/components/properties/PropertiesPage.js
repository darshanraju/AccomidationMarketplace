import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import {
  fetchProperty,
  fetchUserProperties,
  deleteProperty,
  fetchSearchProperty,
  fetchSearchPropertyFeatures,
  fetchSearchPropertyReviews,
  fetchSearchPropertyImages,
  bookedDates,
  ownerContactInfo
} from '../../actions';

class PropertiesPage extends Component {
  componentDidMount() {
    this.props.fetchUserProperties(this.props.auth.user.id);
  }

  handleOnClick = async (id, e) => {
    await this.props.fetchProperty(id);
    this.props.history.push('/properties/manage');
  }

  handleDelete = async (id) => {
    await this.props.deleteProperty(id);
    this.props.fetchUserProperties(this.props.auth.user.id);
  }

  handleClickProperty = async (id) => {
    await this.props.fetchSearchProperty(id);
    var today = new Date();
    await this.props.bookedDates(id, today);
    await this.props.fetchSearchPropertyFeatures(id);
    await this.props.fetchSearchPropertyReviews(id);
    await this.props.fetchSearchPropertyImages(id);
    await this.props.ownerContactInfo(id);
    this.props.history.push('/property');
  }


  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3} component={NavLink} to="/properties/add">
          <Typography variant="subtitle1">Add Property</Typography>
        </Grid>
        {this.props.uProperties.properties.map((currentProperty) => (
          <Grid item xs={3} key={currentProperty.id}>
            <Card>
              <CardActionArea
                onClick={() => this.handleClickProperty(currentProperty.id)}
              >
                <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
                <Typography variant="subtitle2">Bathrooms: {currentProperty.no_bathrooms}</Typography>
                <Typography variant="subtitle2">Fits: {currentProperty.no_guests} people</Typography>
                <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
              </CardActionArea>
              <Button onClick={(e) => this.handleOnClick(currentProperty.id, e)}>Manage</Button>
              <Button onClick={(e) => this.handleDelete(currentProperty.id)}>Delete</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    uProperties: state.uProperties
  };
};

export default compose(
  connect(mapStateToProps, {
    fetchUserProperties,
    fetchProperty,
    deleteProperty,
    fetchSearchProperty,
    fetchSearchPropertyFeatures,
    fetchSearchPropertyReviews,
    fetchSearchPropertyImages,
    bookedDates,
    ownerContactInfo
  }),
  withRouter
)(PropertiesPage);