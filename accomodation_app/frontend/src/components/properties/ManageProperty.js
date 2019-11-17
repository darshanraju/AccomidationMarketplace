import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Switch, Route, Link } from "react-router-dom";

import { updateProperty, fetchProperty } from '../../actions/index';
import ManagePropertyForm from './ManagePropertyForm';
import CurrentPropertyBookings from './CurrentPropertyBookings';
import PrevPropertyBookings from './PrevPropertyBookings';

/*
        <Typography variant="subtitle2">id: {selectedProperty.id}</Typography>
        <Typography variant="subtitle2">Bathrooms: {selectedProperty.no_bathrooms}</Typography>
        <Typography variant="subtitle2">Fits: {selectedProperty.no_guests} people</Typography>
        <Typography variant="subtitle2">Price: ${selectedProperty.price}/night</Typography>
*/

class ManageProperty extends Component {
  state = { value: '/properties/manage' };

  submit = async (formValues) => {
    await this.props.updateProperty(formValues);
    this.props.fetchProperty(this.props.uProperties.selectedProperty.id);
  }

  handleTabChange = (value) => {
    this.setState({ value: value });
  };

  render() {
    const selectedProperty = this.props.uProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            label="Manage"
            value="/properties/manage"
            component={Link} to="/properties/manage"
            onClick={() => this.handleTabChange('/properties/manage')}
          />
          <Tab
            label="Current Bookings"
            value="/properties/manage/currentbookings"
            component={Link} to="/properties/manage/currentbookings"
            onClick={() => this.handleTabChange('/properties/manage/currentbookings')}
          />
          <Tab
            label="Previous Bookings"
            value="/properties/manage/previousbookings"
            component={Link} to="/properties/manage/previousbookings"
            onClick={() => this.handleTabChange('/properties/manage/previousbookings')}
          />
        </Tabs>
        <Switch>
          <Route exact path="/properties/manage">
            <ManagePropertyForm onSubmit={(formValues) => this.submit(formValues)} />
          </Route>
          <Route path="/properties/manage/currentbookings">
            <CurrentPropertyBookings />
          </Route>
          <Route path="/properties/manage/previousbookings">
            <PrevPropertyBookings />
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { uProperties: state.uProperties };
};

export default connect(mapStateToProps, { updateProperty, fetchProperty })(ManageProperty);