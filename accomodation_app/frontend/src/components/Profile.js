import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const userDetails = {
  name: 'Will Smith',
  phoneNumber: '0429510299',
}

class Profile extends Component {
  render () {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" >
        <Paper width={1/2}>
          <Typography variant="subtitle2">Name: {userDetails.name}</Typography>
          <Typography variant="subtitle2">Phone Number: {userDetails.phoneNumber}</Typography>
        </Paper>
      </Box>
    )
  }
}

export default Profile;