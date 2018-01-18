import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';
import * as userinfoActions from '../../actions/userinfo';
import {CITYNAME} from '../../config/localStorekey';
import LocalStore from '../../util/localStore';


class City extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div>
          <Header title="选择城市"/>
          <CurrentCity cityName={this.props.userinfo.cityName}/>
          <CityList changeFn={this.changeCity.bind(this)}/>
        </div>
    )
  }

  changeCity(newCity) {
    if (newCity == null) {
      return
    }

    const userinfo = this.props.userinfo;
    userinfo.cityName = newCity;
    this.props.userinfoAction.update(userinfo);

    // 修改localStoreage
    LocalStore.setItem(CITYNAME, newCity);

    // 路由跳转
    this.props.history.push('/');
  }
}

// 第三步：定义数据变化后派发规则
// userinfo: 变成props里的一个能用的参数
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// 第四步：触发规则变化
function mapDispatchToProps(dispatch) {
  return {
    userinfoAction: bindActionCreators(userinfoActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)