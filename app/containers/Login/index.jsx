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

  // check login or not.
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

  // handle login success
  loginHandle(username) {
    // redux
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;
    userinfo.username = username;
    actions.update(userinfo);
    // get :router
    // appContainer: <Route path={"/login/:router?"}
    const router = this.props.match.params.router;
    if (router) {
      this.props.history.push(router);
    } else {
      this.goUserPage();
    }
  }
}

// Redux
// Step three: Define distribution rules after data changes
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

// Step Fourth: Triggering rule changes
function mapDispatchToProps(dispatch) {
  return {
    // userInfoActions use update()
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFiles, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)