import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
// redux flow
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionsFromOtherFiles from './actions/userinfo';
// localstorage
import {CITYNAME} from './config/localStorekey';
import LocalStore from './util/localStore';
// bundle load asynchronously
import Bundle from './bundle';
// not load asynchronously
import HomeContainer from './containers/Home';
import FooterContainer from './components/Footer';
// load asynchronously
import CityContainer from 'bundle-loader?lazy!./containers/City';
import CityContainer from 'bundle-loader?lazy!./containers/City';
import SearchContainer from 'bundle-loader?lazy!./containers/Search';
import UserContainer from 'bundle-loader?lazy!./containers/User';
import DetailContainer from 'bundle-loader?lazy!./containers/Detail';
import NotFoundContainer from 'bundle-loader?lazy!./containers/NotFound';
import LoginContainer from 'bundle-loader?lazy!./containers/Login';


const City = (props) => {
  <Bundle load={CityContainer}>
    {
      (City) => <City

      />
    }
  </Bundle>
}


class AppContainer extends Component {

}