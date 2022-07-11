import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import organisationReducer from './organisationReducer';
import groupReducer from './groupReducer';
import activityReducer from './activityReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  organisation: organisationReducer,
  group: groupReducer,
  activity: activityReducer,
});
