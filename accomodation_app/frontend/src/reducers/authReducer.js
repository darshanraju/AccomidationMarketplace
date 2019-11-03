import {
  LOGIN,
  LOGOUT,
  REGISTER_USER,
  LOGIN_USER
} from '../actions/types';


const initialState = {
  loggedIn: false,
  user: {
    name: 'James Clear',
    phoneNumber: '0419628394',
    id: 1
  },
  token: '6838340ede2f189a102c9ec068b61b308f91c3fd311789e9484a7e8526524e56'
};

export default (auth = initialState, action) => {
  let newState = { ...auth };
  switch (action.type) {
    case LOGIN:
      newState.loggedIn = true;
      console.log("LoggedIn State: ", newState.loggedIn)
      return newState;

    case LOGOUT:
      newState.loggedIn = false;
      return newState;

    case REGISTER_USER:
      return newState;

    case LOGIN_USER:
      newState.loggedIn = true
      newState.user = action.payload.data.user
      newState.token = action.payload.data.token
      console.log("New LoggedIn State: ", newState)
      return newState;

    default:
      return auth;
  }
}