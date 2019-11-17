import {
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES,
  ADD_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
  FETCH_PROPERTY_BOOKINGS
} from '../actions/types';

const initialState = {
  properties: [],
  selectedProperty: null,
  bookings: []
}

export default (uProperties = initialState, action) => {
  let newState = { ...uProperties };
  switch (action.type) {
    case FETCH_PROPERTY:
      newState.selectedProperty = action.payload;
      return newState;
    case FETCH_USER_PROPERTIES:
      newState.properties = Object.values(action.payload);
      return newState;
    case ADD_PROPERTY:
      return newState;
    case UPDATE_PROPERTY:
      return newState;
    case DELETE_PROPERTY:
      return newState;
    case FETCH_PROPERTY_BOOKINGS:
      newState.bookings = action.payload;
      return newState;
    default:
      return uProperties;
  }
}