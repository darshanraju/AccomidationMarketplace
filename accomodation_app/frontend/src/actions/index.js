import accommodation from '../apis/accommodation';
import {
  LOGIN,
  LOGOUT,
  FETCH_PROPERTY
} from './types';

export const login = () => {
  return { type: LOGIN };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const fetchProperty = () => async (dispatch, getState) => {
  const response = await accommodation.get('property/1');
  dispatch({ type: FETCH_PROPERTY, payload: response })
};