import React from 'react';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format, parseISO } from 'date-fns';

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

export const renderKeyboardDatePicker = ({
  label,
  input,
  ...custom
}) => (
  <KeyboardDatePicker
    label={label}
    onChange={(e, val) => {return input.onChange(val)}}
    format="MM/dd/yyyy"
    value={input.value}
    {...custom}
  />
);