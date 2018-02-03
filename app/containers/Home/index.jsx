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
    // Some invalid changes triggered the Shouldcomponentupdate function, and also caused an invalid update
    // Rewrite the shouldcomponentupdate function of the component to judge props and state before each update,
    // Returns true if there is a change, and returns False if there is no change.
    // Therefore, during the development process, we try to use purerendermixin in every react component
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div>
          {/* cityName={this.props.userinfo.cityName} */}
          {/* appContainer: line169 */}
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

// Step three: Define distribution rules after data changes
// reducers/index.js: The return value can become state
// userinfo: become a props parameter: userinfo
// when data change，this.props.userinfo will change
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// Step Fourth: Triggering rule changes
// appActionList: become a props parameter: appActionList
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