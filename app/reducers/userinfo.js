import * as userTypes from '../constants/userinfo';


// Redux
// 第一步：计算规则
export default function userinfo(state = {}, action) {
  switch (action.type) {
    case userTypes.USERINFO_UPDATE:
      return action.data;
    default:
      return state;
  }
}