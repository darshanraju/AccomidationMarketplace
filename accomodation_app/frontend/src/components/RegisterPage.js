import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    multiline: "Controlled"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="outlined-name"
              label="Username"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Email"
              type="email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <br />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Retype Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Register
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
}
