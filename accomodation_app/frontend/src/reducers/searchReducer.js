import {
  SEARCH_PROPERTIES,
  FETCH_SEARCH_PROPERTY,
  FETCH_SEARCH_PROPERTY_FEATURES,
  FETCH_SEARCH_PROPERTY_REVIEWS,
  FETCH_SEARCH_PROPERTY_IMAGES,
  BOOKED_DATES,
  OWNER_CONTACT_INFO
} from '../actions/types';

const initialState = {
  properties: [],
  selectedProperty: null,
  contactInfo: null,
  selectedPropertyFeatures: [],
  selectedPropertyReviews: [],
  selectedPropertyBookedDates: [],
  selectedPropertyImages: []
};

export default (searchProperties = initialState, action) => {
  let newState = { ...searchProperties };
  switch (action.type) {
    case FETCH_SEARCH_PROPERTY:
      newState.selectedProperty = action.payload;
      return newState;
    case SEARCH_PROPERTIES:
      newState.properties = action.payload;
      return newState;
    case FETCH_SEARCH_PROPERTY_FEATURES:
      newState.selectedPropertyFeatures = action.payload;
      return newState;
    case FETCH_SEARCH_PROPERTY_REVIEWS:
      newState.selectedPropertyReviews = action.payload;
      return newState;
    case FETCH_SEARCH_PROPERTY_IMAGES:
      newState.selectedPropertyImages = action.payload;
      return newState;
    case BOOKED_DATES:
      newState.selectedPropertyBookedDates = action.payload;
      return newState;
    case OWNER_CONTACT_INFO:
      newState.contactInfo = action.payload;
      return newState;
    default:
      return searchProperties;
  }
}