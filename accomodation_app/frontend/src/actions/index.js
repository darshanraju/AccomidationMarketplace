import accommodation from '../apis/accommodation';
import {
  LOGIN,
  LOGOUT,
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES,
  ADD_PROPERTY
} from './types';

export const login = () => {
  return { type: LOGIN };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const fetchProperty = (propertyID) => async (dispatch, getState) => {
  const response = await accommodation.get('property/'+propertyID);
  const data = response.data;
  dispatch({ type: FETCH_PROPERTY, payload: data })
};

export const fetchUserProperties = (userID) => async (dispatch, getState) => {
  const response = await accommodation.get('property/owner/'+userID);
  const data = response.data;
  dispatch({ type: FETCH_USER_PROPERTIES, payload: data })
}

export const addProperty = (formValues) => async (dispatch, getState) => {
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
  const response = await accommodation.post('property/add', postData);
  dispatch({ type: ADD_PROPERTY, payload: response });
}