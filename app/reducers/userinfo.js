import * as userTypes from '../constants/userinfo';


// redux
// First step: Calculating rules
export default function userinfo(state = {}, action) {
  switch (action.type) {
    case userTypes.USERINFO_UPDATE:
      return action.data;
    default:
      return state;
  }
}