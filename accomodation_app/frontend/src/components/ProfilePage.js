import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  render() {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" >
        <Paper width={1 / 2}>
          <Typography variant="subtitle2">Username: {this.props.auth.user.username}</Typography>
          <Typography variant="subtitle2">Name: {this.props.auth.user.first_name} {this.props.auth.user.last_name}</Typography>
          <Typography variant="subtitle2">Email : {this.props.auth.user.email}</Typography>
        </Paper>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(ProfilePage);