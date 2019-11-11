import {
  FETCH_USER_TRIPS,
  ADD_USER_TRIP,
  DELETE_TRIP
} from '../actions/types'

const initialState = {
  trips: [],
}

export default (userTrips = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_TRIPS:
      return { ...userTrips, trips: action.payload };
    case ADD_USER_TRIP:
      return userTrips;
    case DELETE_TRIP:
      return { ...userTrips, trips: action.payload };
    default:
      return userTrips;
  }
}