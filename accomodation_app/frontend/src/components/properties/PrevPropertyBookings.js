import React, { Component } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

import { fetchPropertyBookings } from "../../actions/index";

const styles = (theme) => ({
  item: {
    width: "50%"
  },
  paper: {
    padding: theme.spacing(2, 2)
  },
  textRight: {
    "text-align": "right"
  },
  toolbar: theme.mixins.toolbar,
});

function compareDates(a, b) {
  if (a.booking.checkout > b.booking.checkout) {
    return -1;
  }
  if (a.booking.checkout < b.booking.checkout) {
    return 1;
  }
  return 0;
}

class PrevPropertyBookings extends Component {
  state = { currentBookings: [] };

  async componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    await this.props.fetchPropertyBookings();
    var bookings = this.props.uProperties.bookings.filter(
      booking => booking.booking.checkout < today
    );
    bookings.sort(compareDates);

    this.setState({
      currentBookings: bookings
    });
    console.log(this.state.currentBookings);
  }

  dateParser(date) {
    var [year, month, day] = date.split('-');
    return day + '/' + month + '/' + year;
  }

  nightsCalculator(checkin, checkout) {
    var [year1, month1, day1] = checkin.split('-');
    var [year2, month2, day2] = checkout.split('-');
    var date1 = new Date(year1, month1, day1);
    var date2 = new Date(year2, month2, day2);
    var time_difference = date2.getTime() - date1.getTime();
    return time_difference / (1000 * 3600 * 24);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3} direction="column" alignItems="center">
        <div className={classes.toolbar} />
        {this.state.currentBookings.map((current) => (
          <Grid item key={current.booking.id} className={classes.item}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2" className={classes.textRight}>
                {this.dateParser(current.booking.checkin)}
              </Typography>
              <Typography variant='subtitle2' className={classes.textRight}>
                {'to ' + this.dateParser(current.booking.checkout)}
              </Typography>
              <Typography variant="subtitle2" className={classes.textRight}>
                {this.nightsCalculator(current.booking.checkin, current.booking.checkout)}
                {this.nightsCalculator(current.booking.checkin, current.booking.checkout) > 1
                  ? " nights" : " night"}
              </Typography>
              <Typography variant="subtitle2">
                Guest: {current.guest.first_name + ' ' + current.guest.last_name}
              </Typography>
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

export default compose(
  connect(mapStateToProps, { fetchPropertyBookings }),
  withStyles(styles)
)(PrevPropertyBookings);