import * as appTypes from '../constants/app';


// 用来处理最底下的界面切换功能: 首页，发现，我的
// data为传进来的参数
export function menu(data) {
  return {
    type: appTypes.MENU_UPDATE,
    data
  }
}