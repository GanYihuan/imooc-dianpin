const Koa = require('koa');
const app = new Koa();
let router = require('koa-router')();

// 首页广告
let homeAdData = require('./home/ad.js');
router.get('/api/homead', function (ctx, next) {
  ctx.body = homeAdData;
});

// 列表
let homeListData = require('./home/list.js');
router.get('/api/homelist/:city/:page', function (ctx, next) {
  const paramsCity = ctx.params.city;
  const paramsPage = ctx.params.page;

  console.log("当前城市：" + paramsCity);
  console.log("当前页数：" + paramsPage);

  ctx.body = homeListData;
});

// User界面中 订单列表
let orderList = require('./user/info.js');
router.get('/api/orderlist/:username', function (ctx, next) {
  ctx.body = orderList;
});

// need to fix!
router.post('/api/submitComment');


// 搜索结果页 - 搜索结果 - 三个参数
let searchListData = require('./search/list.js');
router.get('/api/search/:page/:city/:category/:keyword', function (ctx, next) {
  // 参数
  const paramsPage = ctx.params.page;
  const paramsCity = ctx.params.city;
  const paramsCategory = ctx.params.category;
  const paramsKeyword = ctx.params.keyword;

  console.log('当前页数：' + paramsPage);
  console.log('当前城市：' + paramsCity);
  console.log('当前类别：' + paramsCategory);
  console.log('关键字：' + paramsKeyword);

  ctx.body = searchListData
});

// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', function (ctx, next) {
  // 参数
  const paramsPage = ctx.params.page;
  const paramsCity = ctx.params.city;
  const paramsCategory = ctx.params.categor;

  console.log('当前页数：' + paramsPage);
  console.log('当前城市：' + paramsCity);
  console.log('当前类别：' + paramsCategory);

  ctx.body = searchListData
});

// 详情页 - 商户信息
const detailInfo = require('./detail/info.js');
router.get('/api/detail/info/:id', function (ctx, next) {
  console.log('详情页 - 商户信息');

  const id = ctx.params.id;

  console.log('商户id: ' + id);

  ctx.body = detailInfo
});

// 详情页 - 用户评论
const detailComment = require('./detail/comment.js');
router.get('/api/detail/comment/:page/:id', function (ctx, next) {
  console.log('详情页 - 用户点评');
  const page = ctx.params.page;
  const id = ctx.params.id;

  console.log('商户id: ' + id);
  console.log('当前页数: ' + page);

  ctx.body = detailComment
});

// 开启服务
const serve = require('koa-static');
app.use(serve(__dirname + '/images'));
app.use(router.routes())
    .use(router.allowedMethods());
let config = require("./config/config");
app.listen(config.port);