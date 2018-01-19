import {combineReducers} from 'redux';
import userinfo from './userinfo';
import app from './app';


// 包裹第一步的计算规则，给第三步创建state参数
// combineReducers 能方便写多个规则
export default combineReducers({
  userinfo,
  app
});