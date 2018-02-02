import * as userTypes from '../constants/userinfo';


// update(作为action传给reducers,
export function update(data) {
  return {
    type: userTypes.USERINFO_UPDATE,
    data
  }
}