import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import * as storeActionsFromFile from '../../../actions/store';
import BuyAndStore from '../../../components/BuyAndStore/index.jsx';


class Buy extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isStore: false
    }
  }

  render() {
    return (
        <div>
          <BuyAndStore
              isStore={this.state.isStore}
              buyClickHandle={this.buyHandle.bind(this)}
              storeHandle={this.storeHandle.bind(this)}
          />
        </div>
    )
  }

  componentDidMount() {
    this.checkStoreState();
  }

  checkStoreState() {
    const id = this.props.id;
    const store = this.props.store;
    // some: As long as there is a satisfaction can be
    store.some((item) => {
      if (item.id === id) {
        this.setState({
          isStore: true
        });
        return true
      }
    });
  }

  buyHandle() {
    const loginFlag = this.loginCheck();
    if (!loginFlag) {
      return
    }
    // 购买流程(略)
    // ...
    this.props.history.push('/user');
  }

  storeHandle() {
    const loginFlag = this.loginCheck();
    if (!loginFlag) {
      return
    }
    const id = this.props.id;
    const storeActions = this.props.storeActions;
    if (this.state.isStore) {
      // The current user has been collected, click Cancel Collection
      storeActions.rm({id: id})
    } else {
      // The current user is not collected, click the collection
      storeActions.add({id: id})
    }
    this.setState({
      isStore: !this.state.isStore
    })
  }

  loginCheck() {
    const id = this.props.id;
    const userinfo = this.props.userinfo;
    if (!userinfo.username) {
      this.props.history.push('/login/' + encodeURIComponent('/detail/' + id));
      return false
    }
    return true
  }
}

// Redux
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)