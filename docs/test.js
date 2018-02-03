import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './style.less';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const menu = this.props.app.location;
    return (
        <div>
          {
            menu === 0
                ? ''
                :
                <div id={styles['common-footer']}>
                  <ul className={styles['footer-list']}>
                    <li>
                      {
                        menu === 1
                            ? <span className={styles['active']}>Home</span>
                            : <Link to={'/'}><span>Home</span></Link>
                      }
                    </li>
                    <li>
                      {
                        menu === 3
                            ? <span className={styles['active']}></span>
                            : <Link to={'/search/all'}><span></span></Link>
                      }
                    </li>
                    <li>
                      {
                        menu === 4
                            ? <span className={styles['active']}></span>
                            : <Link to={'/user'}></Link>
                      }
                    </li>
                  </ul>
                </div>
          }
        </div>
    )
  }
}

// redux
function mapStateToProps(state) {
  return {
    app: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)