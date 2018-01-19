import {get} from '../get'


// koa接口
export function getAdData() {
  const result = get('/api/homead');
  return result;
}

// koa接口
export function getListData(city, page) {
  const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page);
  return result;
}