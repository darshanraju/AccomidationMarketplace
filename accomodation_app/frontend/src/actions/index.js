import { format } from 'date-fns';

import accommodation from '../apis/accommodation';
import {
  LOGOUT,
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES,
  ADD_PROPERTY,
  UPDATE_PROPERTY,
  REGISTER_USER,
  LOGIN_USER,
  ERROR_MSG,
  SEARCH_PROPERTIES,
  FETCH_SEARCH_PROPERTY,
  FETCH_SEARCH_PROPERTY_FEATURES,
  FETCH_SEARCH_PROPERTY_REVIEWS,
  BOOK_PROPERTY,
  FETCH_USER_TRIPS,
  DELETE_TRIP,
  DELETE_PROPERTY,
  FETCH_PROPERTY_BOOKINGS,
  FETCH_USER_TRIP,
  SORT_CURRENT_TRIPS,
  UPDATE_TRIP,
  REVIEW_TRIP,
  BOOKED_DATES,
  SORT_PREVIOUS_TRIPS
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

export const fetchSearchPropertyFeatures = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('feature/' + propertyID);
  const data = response.data;
  dispatch({ type: FETCH_SEARCH_PROPERTY_FEATURES, payload: data })
};

export const fetchSearchPropertyReviews = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('review/property/for/' + propertyID);
  const data = response.data;
  dispatch({ type: FETCH_SEARCH_PROPERTY_REVIEWS, payload: data })
};

export const fetchUserTrip = (bookingID) => async (dispatch, getState) => {
  const response = await accommodation.get('booking/' + bookingID);
  const data = response.data;
  dispatch({ type: FETCH_USER_TRIP, payload: data })
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

export const updateProperty = (formValues) => async (dispatch, getState) => {
  console.log('Updating property');
  const headers = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json',
    }
  };

  const updateData = {
    address: formValues.address,
    suburb: formValues.suburb,
    postcode: formValues.postcode,
    price: formValues.price,
    no_guests: formValues.no_guests,
    no_beds: formValues.no_beds,
    no_bathrooms: formValues.no_bathrooms
  }

  const propertyId = getState().uProperties.selectedProperty.id;

  const response = await accommodation.put('property/update/' + propertyId, updateData, headers)
  console.log(response);
  dispatch({ type: UPDATE_PROPERTY });
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
  if (formValues.Pool) {
    hasfilters = true;
    filter_list = [...filter_list, "Pool"];
  }
  if (formValues.Aircon) {
    hasfilters = true;
    filter_list = [...filter_list, "Air Conditioner"];
  }
  if (formValues.Wifi) {
    hasfilters = true;
    filter_list = [...filter_list, "Wifi"];
  }
  if (formValues.FreeParking) {
    hasfilters = true;
    filter_list = [...filter_list, "Free Parking"];
  }
  const filters = (hasfilters) ? filter_list.join(",") : null;
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
  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token
    }
  }

  const response = await accommodation.get('booking/guest/' + getState().auth.user.id, header);
  dispatch({ type: FETCH_USER_TRIPS, payload: response.data })
}

function sortDatesAscending(a, b) {
  if (a.booking.checkin < b.booking.checkin) {
    return -1;
  }
  if (a.booking.checkin > b.booking.checkin) {
    return 1;
  }
  return 0;
}

function dateToString() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

export const sortCurrentTrips = () => async (dispatch, getState) => {
  const today = dateToString();
  var trips = getState().userTrips.trips;
  trips = trips.filter(trip => trip.booking.checkout >= today)
  trips.sort(sortDatesAscending);
  dispatch({ type: SORT_CURRENT_TRIPS, payload: trips });
}

function sortDatesDescending(a, b) {
  if (a.booking.checkout > b.booking.checkout) {
    return -1;
  }
  if (a.booking.checkout < b.booking.checkout) {
    return 1;
  }
  return 0;
}

export const sortPreviousTrips = () => async (dispatch, getState) => {
  const today = dateToString();
  var trips = getState().userTrips.trips;
  trips = trips.filter(trip => trip.booking.checkout < today)
  trips.sort(sortDatesDescending);
  dispatch({ type: SORT_PREVIOUS_TRIPS, payload: trips });
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

export const deleteProperty = (propertyID) => async (dispatch, getState) => {
  console.log('deleting property clicked');
  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token
    }
  }


  const response = await accommodation.delete('property/' + propertyID, header)
  console.log(response);
  dispatch({ type: DELETE_PROPERTY });
}

export const fetchPropertyBookings = () => async (dispatch, getState) => {
  const headers = {
    headers: {
      Authorization: "Token " + getState().auth.token
    }
  }

  const propertyId = getState().uProperties.selectedProperty.id
  const response = await accommodation.get('booking/property/' + propertyId, headers)
  console.log(response);
  dispatch({ type: FETCH_PROPERTY_BOOKINGS, payload: response.data })
}

export const updateTrip = (formValues, bookingID) => async (dispatch, getState) => {
  const checkIn = format(formValues.checkIn, 'yyy-MM-dd');
  const checkOut = format(formValues.checkOut, 'yyy-MM-dd');
  const no_guests = formValues.no_guests

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json'
    }
  }

  const postData = {
    checkin: checkIn,
    checkout: checkOut,
    no_guests: no_guests
  }

  const updateURL = "booking/update/" + bookingID

  const response = await accommodation.put(updateURL, postData, header);
  console.log("Update Trip: ", response)
  dispatch({ type: UPDATE_TRIP, payload: response.data });
}

export const reviewTrip = (formValues, bookingID) => async (dispatch, getState) => {

  const description = formValues.description
  const rating = formValues.rating

  const header = {
    headers: {
      Authorization: "Token " + getState().auth.token,
      'Content-Type': 'application/json'
    }
  }

  const postData = {
    booking_id: bookingID,
    description: description,
    rating: rating
  }

  const reviewURL = "review/property/add"

  const response = await accommodation.post(reviewURL, postData)

  console.log("Review Trip: ", response)
  dispatch({ type: REVIEW_TRIP, payload: response.data });
}

export const bookedDates = (propertyID, date) => async (dispatch, getState) => {
  const response = await accommodation.get('booked_dates/' + propertyID + '/'+ format(date, 'yyy-MM-dd'));
  const data = response.data;
  dispatch({ type: BOOKED_DATES, payload: data })
};