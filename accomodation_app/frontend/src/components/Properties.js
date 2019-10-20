import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const houseDetails = {
  address: '25 Hollywood Street',
  numBathrooms: '2',
  numPeople: '5',
  price: '55',
}

class Properties extends Component {
  render () {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2">Address: {houseDetails.address}</Typography>
            <Typography variant="subtitle2">Bathrooms: {houseDetails.numBathrooms}</Typography>
            <Typography variant="subtitle2">Fits: {houseDetails.numPeople} people</Typography>
            <Typography variant="subtitle2">Price: ${houseDetails.price}/night</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2">Address: {houseDetails.address}</Typography>
            <Typography variant="subtitle2">Bathrooms: {houseDetails.numBathrooms}</Typography>
            <Typography variant="subtitle2">Fits: {houseDetails.numPeople} people</Typography>
            <Typography variant="subtitle2">Price: ${houseDetails.price}/night</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2">Address: {houseDetails.address}</Typography>
            <Typography variant="subtitle2">Bathrooms: {houseDetails.numBathrooms}</Typography>
            <Typography variant="subtitle2">Fits: {houseDetails.numPeople} people</Typography>
            <Typography variant="subtitle2">Price: ${houseDetails.price}/night</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2">Address: {houseDetails.address}</Typography>
            <Typography variant="subtitle2">Bathrooms: {houseDetails.numBathrooms}</Typography>
            <Typography variant="subtitle2">Fits: {houseDetails.numPeople} people</Typography>
            <Typography variant="subtitle2">Price: ${houseDetails.price}/night</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2">Address: {houseDetails.address}</Typography>
            <Typography variant="subtitle2">Bathrooms: {houseDetails.numBathrooms}</Typography>
            <Typography variant="subtitle2">Fits: {houseDetails.numPeople} people</Typography>
            <Typography variant="subtitle2">Price: ${houseDetails.price}/night</Typography>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default Properties;