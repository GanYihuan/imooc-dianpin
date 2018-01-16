import {combineReducers} from 'redux'
import userinfo from './userinfo'
import app from './app'

// combineReducers 能方便写多个规则
export default combineReducers({
  userinfo,
  app
});