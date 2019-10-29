import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import userPropertiesReducer from './userPropertiesReducer';
import tripsReducer from './tripsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uProperties: userPropertiesReducer,
  trips: tripsReducer,
  form: formReducer,
});

export default rootReducer;