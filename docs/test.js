import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userInfoActionsFromOtherFiles from '../../actions/userinfo';
// router
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// Compnoent
import Header from '../../components/Header/index'
import LoginComponent from './subpage/LoginComponent';


class Login extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      checking: true
    }
  }

  render() {
    return (
        <div>
          <Header title={'login'}/>
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

  docheck() {
    const userinfo = this.props.userinfo;
    if(userinfo.username) {
      this.goUserPage();
    }else{
      this.setState({
        checking: false
      })
    }
  }

  goUserPage() {
    this.props.history.push('/user');
  }

  loginHandle(username) {
    const actions = this.props.userinfoAction;
    let userinfo = this.props.userinfo;
    userinfo.username = username;
    actions.update(userinfo);
    const router = this.props.match.params.router;
    if(router) {
      this.props.history.push(router);
    }else{
      this.goUserPage();
    }
  }
}