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
  SEARCH_PROPERTIES,
  FETCH_SEARCH_PROPERTY,
  BOOK_PROPERTY,
  FETCH_USER_TRIPS,
  DELETE_TRIP,
  DELETE_PROPERTY
} from './types';

export const logout = () => {
  return { type: LOGOUT };
};

export const fetchProperty = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('property/' + propertyID);
  const data = response.data;
  dispatch({ type: FETCH_PROPERTY, payload: data })
};

export const fetchSearchProperty = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('property/' + propertyID);
  const data = response.data;
  dispatch({ type: FETCH_SEARCH_PROPERTY, payload: data })
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
  const checkIn = formValues.checkIn ? format(formValues.checkIn, 'yyy-MM-dd') : null;
  const checkOut = formValues.checkOut ? format(formValues.checkOut, 'yyy-MM-dd') : null;
  var filter_list = [];
  var hasfilters = false;
  if (formValues.Pool){
    hasfilters = true;
    filter_list =  [...filter_list, "Pool"];
  }
  if (formValues.Aircon){
    hasfilters = true;
    filter_list =  [...filter_list, "Air Conditioner"];
  }
  if (formValues.Wifi){
    hasfilters = true;
    filter_list =  [...filter_list, "Wifi"];
  }
  if (formValues.FreeParking){
    hasfilters = true;
    filter_list =  [...filter_list, "Free Parking"];
  }
  const filters = (hasfilters)? filter_list.join(",") : null;
  console.log(filters);

  const suburbName = (isNaN(formValues.suburbOrPostcode)) ? formValues.suburbOrPostcode : null;
  const postcode = (isNaN(formValues.suburbOrPostcode)) ? null : formValues.suburbOrPostcode;

  const config = {
    params: {
      suburb: suburbName,
      "post-code": postcode,
      price: formValues.price,
      "check-in": checkIn,
      "check-out": checkOut,
      guests: formValues.guests,
      beds: formValues.beds,
      bathrooms: formValues.bathrooms,
      "filters": filters
    }
  };

  const response = await accommodation.get('/property/search', config);
  dispatch({ type: SEARCH_PROPERTIES, payload: response.data });
}

export const bookProperty = (formValues, propertyID) => async (dispatch, getState) => {
  const checkIn = format(formValues.checkIn, 'yyy-MM-dd');
  const checkOut = format(formValues.checkOut, 'yyy-MM-dd');

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json'
    }
  }

  const postData = {
    checkin: checkIn,
    checkout: checkOut,
    no_guests: 1,
    property_id: propertyID
  }

  const response = await accommodation.post('booking/add', postData, header);
  dispatch({ type: BOOK_PROPERTY, payload: response.data });
}

export const fetchUserTrips = () => async (dispatch, getState) => {
  console.log('Fetching trips')
  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token
    }
  }

  const response = await accommodation.get('booking/guest/' + getState().auth.user.id, header);
  console.log(response);
  dispatch({ type: FETCH_USER_TRIPS, payload: response.data })
}

export const deleteTrip = (id) => async (dispatch, getState) => {

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json'
    }
  }

  var deleteID = 'booking/' + id
  console.log(deleteID)

  const response1 = await accommodation.delete(deleteID, header)
  console.log(response1)
  const response2 = await accommodation.get('booking/guest/' + getState().auth.user.id, header);
  console.log(response2)

  dispatch({ type: DELETE_TRIP, payload: response2.data })

}

export const deleteProperty = (propertyID, userID) => async (dispatch, getState) => {

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json'
    }
  }

  var deleteID = 'property/' + propertyID
  console.log(deleteID)

  const response1 = await accommodation.delete(deleteID, header)
  console.log(response1)
  const response2 = await accommodation.get('property/owner/' + userID, header);
  console.log(response2)

  dispatch({ type: DELETE_PROPERTY, payload: response2.data })

}