import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography, Collapse } from '@material-ui/core';
import ReviewTripForm from './ReviewTripForm';
import Rating from '@material-ui/lab/Rating';

import {
  searchProperties,
  fetchSearchProperty,
  fetchSearchPropertyFeatures,
  fetchSearchPropertyReviews,
  fetchSearchPropertyImages,
  bookedDates,
  ownerContactInfo
} from '../actions';

import { fetchUserTrips, sortPreviousTrips, reviewTrip } from '../actions/index';

const styles = (theme) => ({
  item: {
    width: "50%"
  },
  card: {
    padding: theme.spacing(0.5, 0.5)
  },
  textRight: {
    "text-align": "right"
  }
})

class PreviousTrips extends Component {
  state = {
    expanded: []
  };

  async componentDidMount() {
    await this.props.fetchUserTrips();
    this.props.sortPreviousTrips();
  }

  dateParser(date) {
    var [year, month, day] = date.split('-');
    return day + '/' + month + '/' + year;
  }

  handleExpansion = (index) => {
    const new_expanded = this.state.expanded.slice();
    if (new_expanded[index]) {
      new_expanded[index] = false;
    } else {
      new_expanded[index] = true;
    }
    this.setState({ expanded: new_expanded })
  }

  handleReview = (formValues, bookingID) => {
    this.props.reviewTrip(formValues, bookingID);
  }

  handleOnClick = async (id) => {
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
    var trips = this.props.userTrips.previousTrips || [];
    const { classes } = this.props;
    return (
      <Grid container spacing={3} direction="column" alignItems="center">
        {trips.map((trip) => (
          <Grid item key={trip.booking.id} className={classes.item}>
            <Card className={classes.card}>
              <CardActionArea
                onClick={() => this.handleOnClick(trip.property.id)}
              >
                <CardContent>
                  <Typography variant="subtitle2" className={classes.textRight}>
                    {this.dateParser(trip.booking.checkin)}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.textRight}>
                    {'to ' + this.dateParser(trip.booking.checkout)}
                  </Typography>
                  <Typography variant="subtitle2">
                    {trip.property.address}
                  </Typography>
                  <Typography variant="subtitle2">
                    {trip.property.suburb + ', NSW, ' + trip.property.postcode}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {(trip.review.description === undefined) ?
                <CardActions>
                  <Button
                    onClick={() => this.handleExpansion(trip.booking.id)}
                  >
                    Review
                  </Button>
                </CardActions> :
                <CardContent>
                  <Typography variant="subtitle2">Your Review:</Typography>
                  <Rating value={trip.review.rating} readOnly precision={0.5} />
                  <Typography variant="subtitle2">{trip.review.description}</Typography>
                </CardContent>
              }
              <Collapse in={this.state.expanded[trip.booking.id]} timeout="auto" unmountOnExit>
                <ReviewTripForm onSubmit={(formValues) => this.handleReview(formValues, trip.booking.id)} />
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userTrips: state.userTrips
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchUserTrips,
    sortPreviousTrips,
    reviewTrip,
    searchProperties,
    fetchSearchProperty,
    fetchSearchPropertyFeatures,
    fetchSearchPropertyReviews,
    fetchSearchPropertyImages,
    bookedDates,
    ownerContactInfo
  }),
  withRouter,
  withStyles(styles)
)(PreviousTrips);