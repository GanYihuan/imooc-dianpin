var config = require("../config/config")
module.exports = [
  {
    id: Date.now(),
    img: config.imgUrl+'/8.png',
    title: '汉堡大王',
    count: 3,
    price: '167',
    commentState: 0
  },
  {
    id: Date.now(),
    img: config.imgUrl+'/9.png',
    title: '麻辣香锅',
    count: 1,
    price: '188',
    commentState: 0
  },
  {
    id: Date.now(),
    img: config.imgUrl+'/10.png',
    title: '好吃自出餐',
    count: 2,
    price: '110',
    commentState: 2
  }
]