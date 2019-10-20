import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class HomePage extends Component {
  handleSubmit = () => {
    console.log('submit hello');
  }

  render () {
    return (
      <Box display="flex" component={MuiPickersUtilsProvider} utils={DateFnsUtils}>
        <Box display="flex" flexDirection="column" component={Paper} width={1/4} m={10} p={2} elevation={3}>
          <Typography variant="heading3">Book a Trip!</Typography>
          <TextField id="location" label="Location" />
          <KeyboardDatePicker id="start-date" label="Start Date" variant="inline" />
          <KeyboardDatePicker id="end-date" label="End Date" variant="inline" />
          <Button variant="contained" color="primary">Search</Button>
        </Box>
      </Box>
    )
  }
}

export default HomePage;