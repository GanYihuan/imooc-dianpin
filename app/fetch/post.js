// fetch, 替代Ajax
import 'whatwg-fetch';
// 向后兼容
import 'es6-promise';


function objparams(obj) {
  let result = '';
  let item;

  for (item in obj) {
    // {key1: 'value1', key2: 'value2'}
    // key1=value1&key2=value2
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }

  if (result) {
    result = result.slice(1);
  }

  return result;
}


export function post(url, paramsObj) {
  let result = fetch(url, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json,text/plain,*/*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // body: 参数
    body: objparams(paramsObj)
  });

  return result;
}

