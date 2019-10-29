import accommodation from '../apis/accommodation';
import {
  LOGIN,
  LOGOUT,
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES
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