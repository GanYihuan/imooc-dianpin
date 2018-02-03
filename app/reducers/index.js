import {combineReducers} from 'redux';
import userinfo from './userinfo';
import app from './app';
import store from './store';


// Wrap the first step of the calculation rule,
// create the state parameter for step three
// combineReducers Easy to write multiple reducers rules
export default combineReducers({
  userinfo,
  app,
  store
});