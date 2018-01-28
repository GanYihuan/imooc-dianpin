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
import SearchContainer from 'bundle-loader?lazy!./containers/Search';
import UserContainer from 'bundle-loader?lazy!./containers/User';
import DetailContainer from 'bundle-loader?lazy!./containers/Detail';
import NotFoundContainer from 'bundle-loader?lazy!./containers/NotFound';
import LoginContainer from 'bundle-loader?lazy!./containers/Login';


const City = (props) => (
    <Bundle load={CityContainer}>
      {
        (City) => <City history={props.props.history}/>
      }
    </Bundle>
);

const Search = (props) => (
    <Bundle load={SearchContainer}>
      {
        (Search) => <Search
            history={props.props.history}
            match={props.props.match}
        />
      }
    </Bundle>
);

const User = (props) => (
    <Bundle load={UserContainer}>
      {
        (User) => <User history={props.props.history}/>
      }
    </Bundle>
);

// match={props.props.match}: 传递了params, redux所有参数
// /detail/:id ->  /:id 参数
const Login = (props) => (
    <Bundle load={LoginContainer}>
      {
        (Login) => <Login
            history={props.props.history}
            match={props.props.match}
        />
      }
    </Bundle>
);

const Detail = (props) => (
    <Bundle load={DetailContainer}>
      {
        (Detail) => <Detail
            history={props.props.history}
            match={props.props.match}
        />
      }
    </Bundle>
);

const NotFound = (props) => (
    <Bundle load={NotFoundContainer}>
      {
        (NotFound) => <NotFound history={props.props.history}/>
      }
    </Bundle>
);


class AppContainer extends Component {
  constructor(props, context) {
    super(props, context);
    // Avoid invalid rendering
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
                <div id="app">
                  <Switch>
                    <Route
                        exact
                        path="/"
                        component={HomeContainer}
                    />
                    <Route
                        exact
                        path="/city"
                        render={props => (
                            <City props={props}/>
                        )}
                    />
                    {/*
                    /search/:category(/:keyword)
                     其中/search是路径，/:category是必填参数，(/:keyword)是选填参数。
                     */}
                    <Route
                        path="/search/:category/:keyword?"
                        render={props => (
                            <Search props={props}/>
                        )}
                    />
                    <Route
                        path="/detail/:id"
                        render={props => (
                            <Detail props={props}/>
                        )}
                    />
                    <Route
                        path="/user"
                        render={props => (
                            <User props={props}/>
                        )}
                    />
                    <Route
                        path="/login/:router?"
                        render={props => (
                            <Login props={props}/>
                        )}
                    />
                    <Route
                        render={props => (
                            <NotFound props={props}/>
                        )}
                    />
                  </Switch>
                  <FooterContainer history={history}/>
                </div>
                :
                <div>正在加载...</div>
          }
        </Router>
    )
  }

  componentDidMount() {
    let cityName = LocalStore.getItem(CITYNAME);
    if (cityName == null) {
      cityName = '上海'
    }
    // 城市信息保存到redux中，redux能实现数据共享
    // update:   /Users/ganyihuan/Documents/Code/Web/RN/dianpin/app/actions/userinfo.js
    this.props.userInfoActions.update({
      cityName: cityName
    });
    this.setState({
      initDone: true
    });
  }
}

// 第三步：定义数据变化后派发规则
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// 第四步：触发规则变化
function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFiles, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);