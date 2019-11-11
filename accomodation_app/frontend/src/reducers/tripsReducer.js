import {
  FETCH_USER_TRIPS,
  ADD_USER_TRIP,
  DELETE_TRIP,
  FETCH_USER_TRIP,
  UPDATE_TRIP
} from '../actions/types'

const initialState = {
  trips: [],
  selectedTrip: null
}

export default (userTrips = initialState, action) => {
  let newState = { ...userTrips };
  switch (action.type) {
    case FETCH_USER_TRIPS:
      return { ...userTrips, trips: action.payload };
    case ADD_USER_TRIP:
      return userTrips;
    case DELETE_TRIP:
      return { ...userTrips, trips: action.payload };
    case FETCH_USER_TRIP:
      newState.selectedTrip = action.payload;
      return newState;
    case UPDATE_TRIP:
      newState.selectedTrip = Object.values(action.payload);
      return newState;
    default:
      return userTrips;
  }
}