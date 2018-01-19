// fetch, 替代Ajax
import 'whatwg-fetch';
// 向后兼容
import 'es6-promise';


export function get(url) {
  // url, cookie(定义接受文件格式)
  let result = fetch(url, {
    credentials: 'include',
    headers: {
      "Accept": "application/json,text/plain.*/*"
    }
  });
  return result;
}