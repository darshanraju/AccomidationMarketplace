import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BookTripForm from './BookTripForm';
import { bookProperty, bookedDates } from '../../actions';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Rating } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import WifiIcon from '@material-ui/icons/Wifi';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import PoolIcon from '@material-ui/icons/Pool';

var checkin_date = null;
var checkout_date = null;
var nextbookingstart = null;
const msOneDay = 24 * 60 * 60 * 1000; //milliseconds in a dat

class ViewProperty extends Component {

  state = {
    price: (this.props.sProperties.selectedProperty == null ? "" : this.props.sProperties.selectedProperty.price) + " per night"
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
      if ((format(date, 'yyy-MM-dd') == list[i][1]) || (format(date, 'yyy-MM-dd') == list[i][0])) {
        return true;
      }
      if (date < Date.parse(list[i][1]) && date > Date.parse(list[i][0])) {
        return true;
      }
    }
    return false;
  }

  NextBooking() {
    var list = this.props.sProperties.selectedPropertyBookedDates;
    for (var i = 0; i < list.length; i++) {
      if (checkin_date < Date.parse(list[i][0])) {
        return Date.parse(list[i][0]);
      }
    }
    return null;
  }
  AfterNextBooking(date) {
    //console.log(nextbookingstart);
    if (nextbookingstart == null) {
      //console.log("no next booking");
      return false;
    }
    if (format(date, 'yyy-MM-dd') == format(nextbookingstart, 'yyy-MM-dd')) {
      return true;
    }
    if (date > nextbookingstart) {
      return true;
    }
    return false;
  }

  disableBeforeCheckin = (date) => {
    if (checkin_date == null) {
      if (this.AlreadyBooked(date) == true) {
        return true;
      }
    } else {
      if (this.AfterNextBooking(date) == true) {
        return true;
      }
    }
    return date < checkin_date;
  }

  disableAfterCheckout = (date) => {
    if (this.AlreadyBooked(date) == true) {
      return true;
    }
    //return date > checkout_date;
  }

  getMonthBookings = (date) => {
    return this.props.bookedDates(this.props.sProperties.selectedProperty.id, date);
  }

  resetLookup = () => {
    var today = new Date();
    this.props.bookedDates(this.props.sProperties.selectedProperty.id, today);
  }

  resetAfterOpen() {
    var today = new Date();
    this.props.bookedDates(this.props.sProperties.selectedProperty.id, today);
  }

  calculatePrice() {
    var price_per_night = this.props.sProperties.selectedProperty.price;
    if (checkin_date != null && checkout_date != null) {
      var days = Math.round(Math.abs((checkin_date - checkout_date) / msOneDay)) + 1;
      console.log("this spanse " + days + "days");
      var p = price_per_night * days;
      this.setState({ price: p });
    } else {
      var p = price_per_night + " per night";
      this.setState({ price: p });
    }
  }

  AvgRating() {
    var no_reviews = 0;
    var ratings = 0;
    console.log(this.props.sProperties.selectedPropertyReviews);
    for (var review in this.props.sProperties.selectedPropertyReviews) {
      no_reviews += 1;
      ratings += this.props.sProperties.selectedPropertyReviews[review].rating;
    }
    console.log(ratings)
    if (no_reviews > 0) {
      return ratings / no_reviews;
    }
    return 0;
  }

  /*
{(images.length > 0) &&
            <ImageGallery
              items={images}
              showThumbnails={false}
              showBullets={true}
              showPlayButton={false}
            />
          }

            <GridList cellHeight={160}>
            {this.props.sProperties.selectedPropertyImages.map((image) => (
              <GridListTile key={image.id}>
                <img src={image.url} alt='Property Image' />
              </GridListTile>
            ))}
          </GridList>
  */

  render() {
    const selectedProperty = this.props.sProperties.selectedProperty || {};

    var images = [];
    var imgs = this.props.sProperties.selectedPropertyImages;
    for (var i = 0; i < imgs.length; i++) {
      const image = {
        original: imgs[i].url
      };
      images.push(image);
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <GridList cellHeight={300}>
            {this.props.sProperties.selectedPropertyImages.map((image) => (
              <GridListTile key={image.id}>
                <img src={image.url} alt='Property Image' />
              </GridListTile>
            ))}
          </GridList>
          <Typography variant="h4" gutterBottom> {selectedProperty.address}, {selectedProperty.suburb}</Typography>
          <Grid container spacing={5} >
            <Grid item > <Typography variant="body1" gutterBottom> Fits: {selectedProperty.no_guests} </Typography> </Grid>
            <Grid item > <Typography variant="body1" gutterBottom> Beds: {selectedProperty.no_beds} </Typography> </Grid>
            <Grid item > <Typography variant="body1" gutterBottom > Bathrooms: {selectedProperty.no_bathrooms} </Typography> </Grid>
          </Grid>
          <Grid container space={5} direction="column">
            {this.props.sProperties.selectedPropertyFeatures.map((feature) => {
              console.log(feature)
              if (feature === 'Wifi') {
                return (<Grid item>
                  <Typography variant="body1" gutterBottom key={feature}>
                    <WifiIcon /> {feature}
                  </Typography>
                </Grid>)
              } else if (feature === 'Air Conditioner') {
                return (<Grid item>
                  <Typography variant="body1" gutterBottom key={feature}>
                    <AcUnitIcon /> {feature}
                  </Typography>
                </Grid>)
              } else if (feature === 'Heating') {
                return (<Grid item>
                  <Typography variant="body1" gutterBottom key={feature}>
                    <FireplaceIcon />  {feature}
                  </Typography>
                </Grid>)
              } else {
                return (<Grid item>
                  <Typography variant="body1" gutterBottom key={feature}>
                    <PoolIcon /> {feature}
                  </Typography>
                </Grid>)
              }
            })}
          </Grid>
          <Grid container direction="column" spacing={3} >
            <Grid item > <Divider /> </Grid>
            <Grid item > <Typography variant="body1"> Owner's contact: {this.props.sProperties.contactInfo}</Typography> </Grid>
            <Grid item > <Divider /> </Grid>
            <Grid item > <Typography variant="body1"> Price: ${this.state.price}</Typography> </Grid>
          </Grid>
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
            <Grid item > <Rating name="read-only" value={this.AvgRating()} readOnly precision={0.01} /> </Grid>
            <Grid item>
              {this.AvgRating() > 0 ?
                <Typography variant="subtitle2"> Avg: {this.AvgRating().toFixed(2)} </Typography> :
                <Typography variant="subtitle2"> No reviews for this property </Typography>
              }
            </Grid>
          </Grid>
          {this.props.sProperties.selectedPropertyReviews.map((review) => (
            <Grid container spacing={5} key={review.booking_id}>
              <Grid item > <Rating name="read-only" value={review.rating} readOnly precision={0.5} /> </Grid>
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