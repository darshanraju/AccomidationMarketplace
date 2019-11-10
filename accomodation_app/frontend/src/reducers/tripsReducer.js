import {
  FETCH_USER_TRIPS,
  ADD_USER_TRIP
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
    default:
      return userTrips;
  }
}