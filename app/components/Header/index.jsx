import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class Header extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div id={styles['common-header']}>
					<span
              className={styles['back-icon']}
              onClick={this.clickHandle.bind(this)}
          >
						<i className="icon-chevron-left"/>
					</span>
          <h1>{this.props.title}</h1>
        </div>
    )
  }

  clickHandle() {
    // when loginning, jump to user-page,
    // then press chrome back button, will return to login-page,
    // but you have loginning, so login-page immediate jump to user-page, not effect
    // backRouter: "/" return to home-page
    const backRouter = this.props.backRouter;
    if (backRouter) {
      this.props.history.push(backRouter);
    } else {
      window.history.back();
    }
  }
}

export default Header