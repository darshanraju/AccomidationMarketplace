import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userPropertiesReducer from './userPropertiesReducer';
import tripsReducer from './tripsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uProperties: userPropertiesReducer,
  trips: tripsReducer,
});

export default rootReducer;