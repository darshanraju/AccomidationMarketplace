import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { fetchProperty, fetchUserProperties, deleteProperty } from '../../actions';

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

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3} component={NavLink} to="/properties/add">
          <Typography variant="subtitle1">Add Property</Typography>
        </Grid>
        {this.props.uProperties.properties.map((currentProperty) => (
          <Grid item xs={3} key={currentProperty.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
              <Typography variant="subtitle2">Bathrooms: {currentProperty.no_bathrooms}</Typography>
              <Typography variant="subtitle2">Fits: {currentProperty.no_guests} people</Typography>
              <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
              <Button onClick={(e) => this.handleOnClick(currentProperty.id, e)}>Manage</Button>
              <Button onClick={(e) => this.handleDelete(currentProperty.id)}>Delete</Button>
            </Paper>
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
  connect(mapStateToProps, { fetchUserProperties, fetchProperty, deleteProperty }),
  withRouter
)(PropertiesPage);