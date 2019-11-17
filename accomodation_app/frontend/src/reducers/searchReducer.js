import {
  SEARCH_PROPERTIES,
  FETCH_SEARCH_PROPERTY,
  BOOKED_DATES
} from '../actions/types';

const initialState = {
  properties: [],
  selectedProperty: null,
  selectedPropertyBookedDates: []
};

export default(searchProperties = initialState, action) => {
  let newState = { ...searchProperties };
  switch(action.type) {
    case FETCH_SEARCH_PROPERTY:
      newState.selectedProperty = action.payload;
      return newState;
    case SEARCH_PROPERTIES:
      newState.properties = action.payload;
      return newState;
    case BOOKED_DATES:
      newState.selectedPropertyBookedDates = action.payload;
      return newState;
    default:
      return searchProperties;
  }
}