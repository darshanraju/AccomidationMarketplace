import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userPropertiesReducer from './userPropertiesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uProperties: userPropertiesReducer,
});

export default rootReducer;