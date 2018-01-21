import {get} from '../get'


// koa接口
export function getAdData() {
  const result = get('/api/homead');
  return result;
}

// koa接口
export function getListData(city, page) {
  // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page);
  return result;
}