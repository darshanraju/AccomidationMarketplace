import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import userPropertiesReducer from './userPropertiesReducer';
import tripsReducer from './tripsReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uProperties: userPropertiesReducer,
  userTrips: tripsReducer,
  form: formReducer,
  sProperties: searchReducer
});

export default rootReducer;