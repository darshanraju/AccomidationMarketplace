import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { searchProperties, fetchSearchProperty, fetchSearchPropertyFeatures, fetchSearchPropertyReviews, bookedDates, ownerContactInfo } from '../../actions';
import SearchOptions from './SearchOptions';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme) => ({
  item: {
    width: "70%"
  },
  card: {
    display: 'flex',
  },
  divider: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '350px',
    height: '250px',
    flexGrow: 1,
    right: 0
  }
})

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

  render() {
    const { classes } = this.props;
    var image = "https://i.imgur.com/fuIMmTr.jpg"

    return (
      <React.Fragment>
        <SearchOptions onSubmit={this.submit} />
        <Grid container direction="column" spacing={3} alignItems="center">
          {this.props.sProperties.properties.map((currentProperty) => (
            <Grid item key={currentProperty.property.id} className={classes.item}>
              <Card className={classes.card}>
                <div className={classes.divider}>
                  <CardContent className={classes.content}>
                    <Typography variant="subtitle2">Address: {currentProperty.property.address}</Typography>
                    <Typography variant="subtitle2">Bathrooms: {currentProperty.property.no_bathrooms}</Typography>
                    <Typography variant="subtitle2">Fits: {currentProperty.property.no_guests} people</Typography>
                    <Typography variant="subtitle2">Price: ${currentProperty.property.price}/night</Typography>
                  </CardContent>
                  <div className="buttons">
                    <Button onClick={(e) => this.handleOnClick(currentProperty.property.id, e)}>View</Button>
                  </div>
                </div>
                <CardMedia
                  component="img"
                  src={currentProperty.images[0].url || image}
                  className={classes.image}
                />
                <CardActions>
                </CardActions>
              </Card>
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
  connect(mapStateToProps, { searchProperties, fetchSearchProperty, fetchSearchPropertyFeatures, fetchSearchPropertyReviews, bookedDates, ownerContactInfo }),
  withRouter,
  withStyles(styles)
)(SearchPage);