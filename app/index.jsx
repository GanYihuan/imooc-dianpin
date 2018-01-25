import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// 如果不是做native相关的就用 react-router-dom，
// 如果你是做react-native相关的应用就毫不犹豫的选择用 react-router-native来构建你的应用路由咯。
import {BrowserRouter, HashRouter} from 'react-router-dom';
import configureStore from './store/configureStore';
import AppContainer from './appContainer';
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