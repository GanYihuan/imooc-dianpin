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
        <div>
          <input
            type={'text'}
            placeholder={'手机号'}
            onChange={this.changeHandle.bind(this)}
            value={this.state.phone}
          />
          <div className={styles['input-container'] + ' password'}>
            <i className=""></i>
            <input type={'text'} placeholder={'验证码'}/>
          </div>
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
    loginHandle(uesrname);
  }
}