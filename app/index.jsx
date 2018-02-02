import React from 'react';
import {render} from 'react-dom';
// redux.
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
// react-router!
// when development react-native use 'react-router-native'
// otherwise use 'react-router-dom'
import {BrowserRouter, HashRouter} from 'react-router-dom';
import AppContainer from './appContainer';
// style.
import './static/css/common.less';
import './static/css/font.less';


// Resolve mobile End 300 millisecond delay
let FastClick = require('fastclick');
FastClick.attach(document.body);


// Second Step: Generate from Rule store
const store = configureStore();
// Third Step: Define distribution rules after data changes
// Provider, store={store}: passed store
render(
    <Provider store={store}>
      <HashRouter basename="/">
        <AppContainer/>
      </HashRouter>
    </Provider>
    , document.body.appendChild(document.createElement('div'))
);