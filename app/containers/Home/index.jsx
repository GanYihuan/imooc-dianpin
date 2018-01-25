import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appActions from '../../actions/app';
// components
import HomeHeader from '../../components/HomeHeader';
import Category from '../../components/Category';
import Ad from './subpage/Ad';
import List from './subpage/List';


class Home extends Component {
  constructor(props) {
    super(props);
    // 一些无效的改动触发了shouldComponentUpdate函数，也会导致无效的更新
    // 重写组件的shouldComponentUpdate函数，在每次更新之前判断props和state，
    // 如果有变化则返回true，无变化则返回false。
    // 因此，我们在开发过程中，在每个 React 组件中都尽量使用PureRenderMixin
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div>
          <HomeHeader
              cityName={this.props.userinfo.cityName}
              history={this.props.history}
          />
          <Category/>
          <div style={{height: '15px'}}/>
          <Ad/>
          <List cityName={this.props.userinfo.cityName}/>
        </div>
    )
  }

  componentDidMount() {
    // dianpin/app/actions/app.js
    this.props.appActionList.menu({
      location: 1
    });
  }
}

// 第三步：定义数据变化后派发规则
// reducers/index.js: 里的返回值能成为state
// userinfo: 变成props里的一个能用的参数 userinfo
// 数据变化了，this.props.userinfo会立马更新
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// 第四步：触发规则变化
// appActionList: 变成props里的一个能用的参数 appActionList
// appActions: dianpin/app/actions/app.js
function mapDispatchToProps(dispatch) {
  return {
    appActionList: bindActionCreators(appActions, dispatch)
  }
}

// Redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);