import * as appTypes from '../constants/app';


// redux
// First step: Calculating rules
export default function app(state = {}, action) {
  switch (action.type) {
    case appTypes.MENU_UPDATE:
      return action.data;
    default:
      return state;
  }
}