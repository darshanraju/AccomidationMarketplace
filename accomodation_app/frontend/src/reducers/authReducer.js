import {
  LOGIN,
  LOGOUT
} from '../actions/types';


const initialState = {
  loggedIn: false,
  name: 'James Clear',
  phoneNumber: '0419628394',
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