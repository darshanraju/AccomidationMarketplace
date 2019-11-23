import React, { Component } from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

import { renderTextField } from '../../utils/renderFormComponents';
import { withStyles } from '@material-ui/core/styles';
import { loginUser } from '../../actions';
import { connect } from 'react-redux';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const styles = (theme) => ({
    textField: {
        width: 300,
        marginTop: 10
    },
    button: {
        width: 300,
        backgroundColor: '#3F51B6',
        marginTop: 20,
        color: 'white'
    },
})

class LoginUserForm extends Component {
    state = {
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
        this.setState({ usernameError: "" });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
        this.setState({ passwordError: "" });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        if (this.state.username.length == 0) {
            this.setState({ usernameError: "Username required" });
            valid = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: "Password required" });
            valid = false;
        }

        if (valid) {
            await this.props.loginUser(this.state)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ passwordError: "Username or password incorrect" });
                })
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.textField}
                        name="username"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={this.state.usernameError !== ''}
                        helperText={this.state.usernameError}
                        onChange={this.handleUsernameChange}
                        label="Username"
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        name="password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        error={this.state.passwordError !== ''}
                        helperText={this.state.passwordError}
                        onChange={this.handlePasswordChange}
                        label="Password"
                    />
                    <br />
                    <Button type="submit" className={classes.button}>Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default compose(
    connect(null, { loginUser }),
    reduxForm({ form: 'loginUser' }),
    withStyles(styles)
)(LoginUserForm);