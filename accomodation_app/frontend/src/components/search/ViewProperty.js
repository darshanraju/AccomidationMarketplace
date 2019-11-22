import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BookTripForm from './BookTripForm';
import { bookProperty, bookedDates } from '../../actions';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StarRatingComponent from 'react-star-rating-component';
import { Rating } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';


var checkin_date = null;
var checkout_date = null;
var nextbookingstart = null;
const msOneDay = 24 * 60 * 60 * 1000; //milliseconds in a dat

class ViewProperty extends Component {

  state = {
    price: (this.props.sProperties.selectedProperty == null? "":this.props.sProperties.selectedProperty.price) + " per night"
  };

  submit = (formValues) => {
    console.log(format(formValues.checkIn, 'yyy-MM-dd'))
    console.log(format(formValues.checkOut, 'yyy-MM-dd'))
    this.props.bookProperty(formValues, this.props.sProperties.selectedProperty.id);
  }

  setCheckin = (date) => {
    checkin_date = Date.parse(date);
    nextbookingstart = this.NextBooking();
    this.calculatePrice();
  }

  setCheckout = (date) => {
    checkout_date = Date.parse(date);
    this.calculatePrice();
  }

  AlreadyBooked(date) {
    var list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if ((format(date, 'yyy-MM-dd') == list[i][1]) || (format(date, 'yyy-MM-dd') == list[i][0])){
        return true;
      }
      if (date < Date.parse(list[i][1]) && date > Date.parse(list[i][0])){
        return true;
      }
    }
    return false;
  }

  NextBooking(){
    var list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if (checkin_date < Date.parse(list[i][0])){
        return Date.parse(list[i][0]);
      }
    }
    return null;
  }
  AfterNextBooking(date){
    //console.log(nextbookingstart);
    if (nextbookingstart == null){
      //console.log("no next booking");
      return false;
    }
    if (format(date, 'yyy-MM-dd') == format(nextbookingstart, 'yyy-MM-dd')){
      return true;
    }
    if (date > nextbookingstart){
      return true;
    }
    return false;
  }

  disableBeforeCheckin = (date) => {
    if (checkin_date == null){
      if (this.AlreadyBooked(date) == true){
        return true;
      }
    } else { 
      if (this.AfterNextBooking(date) == true){
        return true;
      }
    }
    return date < checkin_date;
  }

  disableAfterCheckout = (date) => {
    if (this.AlreadyBooked(date) == true){
      return true;
    }
    //return date > checkout_date;
  }

  getMonthBookings = (date) =>{
    return this.props.bookedDates(this.props.sProperties.selectedProperty.id, date);
  }

  resetLookup = () => {
    var today = new Date();
    this.props.bookedDates(this.props.sProperties.selectedProperty.id, today);
  }

  resetAfterOpen(){
    var today = new Date();
    this.props.bookedDates(this.props.sProperties.selectedProperty.id, today);
  }

  calculatePrice(){
    var price_per_night = this.props.sProperties.selectedProperty.price;
    if (checkin_date != null && checkout_date != null){
      var days = Math.round(Math.abs((checkin_date - checkout_date) / msOneDay)) + 1;
      console.log("this spanse "+days+"days");
      var p =  price_per_night * days;
      this.setState({price: p});
    } else {
      var p =  price_per_night + " per night";
      this.setState({price: p});
    }
  }

  AvgRating(){
    var no_reviews = 0;
    var ratings = 0;
    console.log(this.props.sProperties.selectedPropertyReviews);
    for (var review in this.props.sProperties.selectedPropertyReviews){
      no_reviews += 1;
      ratings += this.props.sProperties.selectedPropertyReviews[review].rating;
    }
    console.log(ratings)
    if (no_reviews > 0){
      return ratings/no_reviews;
    }
    return 0;
  }
  
  render () {
    const selectedProperty = this.props.sProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid >
            <h1> This is a plaseholder for pictures (it seems a grid list would go well here)  </h1>
          </Grid>
          <Typography variant="h4" gutterBottom> {selectedProperty.address}, {selectedProperty.suburb}</Typography>
          <Grid container spacing={5} >
            <Grid item > <Typography variant="body1" gutterBottom> Fits: {selectedProperty.no_guests} </Typography> </Grid>
            <Grid item > <Typography variant="body1" gutterBottom> Beds: {selectedProperty.no_beds} </Typography> </Grid>
            <Grid item > <Typography variant="body1" gutterBottom > Bathrooms: {selectedProperty.no_bathrooms} </Typography> </Grid>
            { this.props.sProperties.selectedPropertyFeatures.map((feature) => (
              <Grid item  > <Typography variant="body1" gutterBottom key={feature}> {feature} </Typography> </Grid>
            ))}
          </Grid>
          <Divider />
          <Typography variant="body1"> Price: ${this.state.price}</Typography>
          <BookTripForm 
            changeMonthHandler={this.getMonthBookings} 
            setCheckin={this.setCheckin} 
            setCheckout={this.setCheckout} 
            disableBeforeCheckin={this.disableBeforeCheckin}
            disableAfterCheckout={this.disableAfterCheckout} 
            resetLookup={this.resetLookup}
            resetAfterOpen={this.resetAfterOpen}
            onSubmit={this.submit} 
          />
          <Grid container spacing={5} >
            <Grid item > <Typography variant="h5" gutterBottom> Reviews </Typography> </Grid>
            <Grid item > <Rating name="read-only" value={this.AvgRating()} readOnly /> </Grid>
          </Grid>
          { this.props.sProperties.selectedPropertyReviews.map((review) => (
            <Grid container spacing={5} key={review.booking_id}>
              <Grid item > <Rating name="read-only" value={review.rating} readOnly /> </Grid>
              <Grid item > <Typography variant="body1" gutterBottom> {review.description} </Typography> </Grid>
            </Grid>
          ))}
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { sProperties: state.sProperties };
};

export default connect(mapStateToProps, { bookProperty, bookedDates })(ViewProperty);