import {
  FETCH_PROPERTY,
  FETCH_USER_PROPERTIES,
  ADD_PROPERTY
} from '../actions/types';

const initialState = {
  properties: [],
  selectedProperty: null 
}

export default (uProperties = initialState, action) => {
  let newState = { ...uProperties };
  switch(action.type) {
    case FETCH_PROPERTY:
      newState.selectedProperty = action.payload;
      return newState;
    case FETCH_USER_PROPERTIES:
      newState.properties = Object.values(action.payload);
      return newState;
    case ADD_PROPERTY:
      return newState;
    default:
      return uProperties;
  }
}