import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import profile from './profile';

export default combineReducers({
  auth,
  news,
  profile,
});
