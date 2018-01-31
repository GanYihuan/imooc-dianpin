import React, {Componnet} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userinfoActions from '../../actions/userinfo';
// LocalStorage
import {CITYNAME} from "../app/config/localStorekey";
import LocalStore from '';
// Component
import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';


class City extends Componnet {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComoponentUpdate.bind(this);
  }

  render() {
    return (
        <div>
          <Header title={'选择城市'}/>
          <CurrentCity cityName={this.props.userinfo.cityName}/>
          <CityList changeFn={this.changeCity.bind(this)}/>
        </div>
    )
  }

  changeCity(newCity) {
    if(newCity == null) {
      return
    }
    const userinfo = this.props.userinfo;
    userinfo.cityName = newCity;
    this.props.userinfoAction.update(userinfo);
    LocalStore.setItem(CITYNAME, newCity);
    this.props.history.push('/');
  }
}