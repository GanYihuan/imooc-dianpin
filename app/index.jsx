import React from 'react';
import {render} from 'react-dom';
// redux
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
// react-router
// 做react-native就用 react-router-native, 否则用react-router-dom
import {BrowserRouter, HashRouter} from 'react-router-dom';
import AppContainer from './appContainer';
// style
import './static/css/common.less';
import './static/css/font.less';


// 解决移动端300毫秒延迟
let FastClick = require('fastclick');
FastClick.attach(document.body);


// 第二步: 根据规则生成 store
const store = configureStore();
// 第三步：定义数据变化后派发规则
// Provider, store={store}: 传入store
render(
    <Provider store={store}>
      <HashRouter basename="/">
        <AppContainer/>
      </HashRouter>
    </Provider>
    , document.body.appendChild(document.createElement('div'))
);