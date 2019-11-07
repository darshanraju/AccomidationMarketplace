import { format } from 'date-fns';

import accommodation from '../apis/accommodation';
import {
  LOGOUT,
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES,
  ADD_PROPERTY,
  REGISTER_USER,
  LOGIN_USER,
  ERROR_MSG,
  SEARCH_PROPERTIES
} from './types';

export const logout = () => {
  return { type: LOGOUT };
};

export const fetchProperty = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('property/' + propertyID);
  const data = response.data;
  dispatch({ type: FETCH_PROPERTY, payload: data })
};

export const fetchUserProperties = (userID) => async (dispatch, getState) => {
  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token
    }
  }
  const response = await accommodation.get('property/owner/' + userID, header);
  const data = response.data;
  dispatch({ type: FETCH_USER_PROPERTIES, payload: data })
}

export const addProperty = (formValues) => async (dispatch, getState) => {

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json',
    }
  };

  const postData = {
    address: formValues.address,
    suburb: formValues.suburb,
    postcode: formValues.postcode,
    price: formValues.price,
    no_guests: formValues.no_guests,
    no_beds: formValues.no_beds,
    no_bathrooms: formValues.no_bathrooms,
    owner_id: getState().auth.user.id
  }
  const response = await accommodation.post('property/add', postData, header);
  dispatch({ type: ADD_PROPERTY, payload: response });
}

export const registerUser = (formValues) => async (dispatch, getState) => {

  const header = {
    'Content-Type': 'application/json',
  }

  const postData = {
    username: formValues.username,
    email: formValues.email,
    first_name: formValues.first_name,
    last_name: formValues.last_name,
    password: formValues.password
  }
  const response = await accommodation.post('auth/register', postData, header)
    .then(response => {
      console.log("Success:", response)
      dispatch({ type: REGISTER_USER, payload: response });
    })
    .catch(err => {
      console.log("Fail: ", err.response)
      dispatch({ type: ERROR_MSG, payload: err.response })
    })

  dispatch({ type: REGISTER_USER, payload: response });
}

export const loginUser = (formValues) => async (dispatch, getState) => {

  const header = {
    'Content-Type': 'application/json',
  }

  const postData = {
    username: formValues.username,
    password: formValues.password
  }

  const response = await accommodation.post('auth/login', postData, header)
    .then(response => {
      console.log("Success:", response.data)
      dispatch({ type: LOGIN_USER, payload: response.data })
    })
    .catch(err => {
      console.log("Error: ", err.response)
      dispatch({ type: ERROR_MSG, payload: err.response })
    })

}

export const searchProperties = (formValues) => async (dispatch, getState) => {
  const config = {
    params: {
      suburb: formValues.suburb,
      "post-code": formValues.postCode,
      price: formValues.price,
      "check-in": format(formValues.checkIn, 'yyyy-MM-dd'),
      "check-out": format(formValues.checkOut, 'yyyy-MM-dd'),
      guests: formValues.guests,
      beds: formValues.beds,
      bathrooms: formValues.bathrooms
    }
  };
  console.log(config);

  const response = await accommodation.get('/property/search', config);
  console.log(response);
}