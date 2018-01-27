import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import * as userInfoActionsFromOtherFiles from '../../actions/userinfo';
import Header from '../../components/Header/index'
import LoginComponent from './subpage/LoginComponent';


class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      checking: true
    }
  }

  render() {
    return (
        <div>
          <Header title={"login"}/>
          {
            this.state.checking
                ? <div>{/* waiting */}</div>
                : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
          }
        </div>
    )
  }

  componentDidMount() {
    this.docheck();
  }

  // handle login success
  loginHandle(username) {
    // redux
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;
    userinfo.username = username;
    actions.update(userinfo);
    // appContainer: line57
    const router = this.props.match.params.router;
    if (router) {
      this.props.history.push(router);
    } else {
      this.goUserPage();
    }
  }

  // check login or not
  docheck() {
    const userinfo = this.props.userinfo;
    if (userinfo.username) {
      this.goUserPage();
    } else {
      this.setState({
        checking: false
      });
    }
  }

  goUserPage() {
    this.props.history.push('/user');
  }
}

// Redux
// 第三步：定义数据变化后派发规则
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// 第四步：触发规则变化
function mapDispatchToProps(dispatch) {
  return {
    // userInfoActions 使用 update()
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFiles, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)