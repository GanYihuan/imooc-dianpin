import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
// redux
import {bindActionCreators} from 'redux';
import {connet} from 'react-redux';
import * as unserInfoActionFromOtherFiles from '';
// localStorage
import {CITYNAME} from "../app/config/localStorekey";
import LocalStorage from '';
// bundle
import Bundle from '';
//
import HomeContainer from '';
//
import CityContainer from 'bundle-loader?lazy!./containers/City';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.state = {
      initDone: false
    }
  }

  render() {
    const history = createBrowserHistory();
    return (
        <Router>
          {
            this.state.initDone
                ?
                <div id={"app"}>
                  <Switch>
                    <Route exact path={"/"} component={HomeContainer}/>
                    <Route exact path={"/city"} render={(props) => (
                        <City props={props}/>
                    )}/>
                    <Route path={"/search/:category/:keyword?"} render={(props) => (
                        <Search props={props}/>
                    )}/>
                    <Route path={"/detail/:id"} render={(props) => (
                        <Detail props={props}/>
                    )}/>
                    <Route path={"/user"} render={(props) => (
                        <User props={props}/>
                    )}/>
                    <Route path={"/login/:router?"} render={(props) => (
                        <Login props={props}/>
                    )}/>
                    <Route render={(props) => (
                        <NotFound props={props}/>
                    )}/>
                  </Switch>
                  <FooterContainer history={history}/>
                </div>
                :
                <div>loading...</div>
          }
        </Router>
    );
  }
}