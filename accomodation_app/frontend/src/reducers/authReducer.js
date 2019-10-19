import {
  LOGIN,
  LOGOUT
} from '../actions/types';


const initialState = {
  loggedIn: false,
};

export default (auth = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {...auth, loggedIn: true};

    case LOGOUT:
      return {...auth, loggedIn: false};

    default:
      return auth;
  }
}