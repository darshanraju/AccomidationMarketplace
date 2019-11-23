import {
  LOGIN,
  LOGOUT,
  REGISTER_USER,
  LOGIN_USER,
  ERROR_MSG
} from '../actions/types';


const initialState = {
  loggedIn: false,
  user: {
    name: 'James Clear',
    phoneNumber: '0419628394',
    id: 1
  },
  token: '6838340ede2f189a102c9ec068b61b308f91c3fd311789e9484a7e8526524e56',
  errorEmail: '',
  errorUsername: '',
};

export default (auth = initialState, action) => {
  let newState = { ...auth };
  switch (action.type) {

    case LOGOUT:
      newState.loggedIn = false;
      return newState;

    case REGISTER_USER:
      newState.errorEmail = '';
      newState.errorUsername = '';
      return newState;

    case LOGIN_USER:
      newState.loggedIn = true
      newState.user = action.payload.user
      newState.token = action.payload.token
      console.log(newState)
      return newState;

    case ERROR_MSG:

      console.log(action.payload)

      newState.errorMessage = []

      if (action.payload.data.email) {
        console.log("email problem exists: ")
        newState.errorEmail = action.payload.data.email[0];
      }
      if (action.payload.data.username) {
        console.log("username problem exists: ")
        newState.errorUsername = action.payload.data.username[0];
      }

      console.log(newState.errorMessage)
      return newState;

    default:
      return auth;
  }
}