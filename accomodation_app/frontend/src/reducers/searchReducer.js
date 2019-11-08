import {
  SEARCH_PROPERTIES
} from '../actions/types';

const initialState = {
  properties: [],
  selectedProperty: null
};

export default(searchProperties = initialState, action) => {
  let newState = { ...searchProperties };
  switch(action.type) {
    case SEARCH_PROPERTIES:
      newState.properties = action.payload;
      return newState;
    default:
      return searchProperties;
  }
}