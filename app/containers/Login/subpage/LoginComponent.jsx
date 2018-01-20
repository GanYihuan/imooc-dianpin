import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      phone: ''
    }
  }

  render() {
    return (
        <div id={styles['login-container']}>
          <div className={styles["input-container"] + " phone-container"}>
            <i className="icon-tablet"/>
            <input
                type="text"
                placeholder="手机号"
                onChange={this.changeHandle.bind(this)}
                value={this.state.phone}
            />
          </div>
          <div className={styles["input-container"] + " password-container"}>
            <i className="icon-key"/>
            <input type="text" placeholder="验证码"/>
          </div>
          <button
              className={styles["btn-login"]}
              onClick={this.clickHandle.bind(this)}
          >
            Login
          </button>
        </div>
    )
  }

  changeHandle(e) {
    this.setState({
      phone: e.target.value
    })
  }

  clickHandle() {
    const username = this.state.phone;
    const loginHandle = this.props.loginHandle;
    loginHandle(username);
  }
}

export default LoginComponent;