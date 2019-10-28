import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

class PropertiesPage extends Component {
  render () {
    return (
      <Grid container spacing={3}>
        { this.props.uProperties.map((currentProperty) => (
          <Grid item xs={3} key={currentProperty.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
              <Typography variant="subtitle2">Bathrooms: {currentProperty.numBathrooms}</Typography>
              <Typography variant="subtitle2">Fits: {currentProperty.numPeople} people</Typography>
              <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { uProperties: state.uProperties };
};

export default connect(mapStateToProps)(PropertiesPage);