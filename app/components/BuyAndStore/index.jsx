import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import styles from './style.less';


class BuyAndStore extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div className={styles["buy-store-container"] + " clear-fix"}>
          <div className={styles["item-container"] + " float-left"}>
            {
              this.props.isStore
                  ?
                  <button
                      className={styles["selected"]}
                      onClick={this.storeClickHandle.bind(this)}
                  >
                    已收藏
                  </button>
                  :
                  <button onClick={this.storeClickHandle.bind(this)}>收藏</button>
            }
          </div>
          <div className={styles["item-container"] + " float-right"}>
            <button onClick={this.buyClickHandle.bind(this)}>购买</button>
          </div>
        </div>
    )
  }

  storeClickHandle() {
    this.props.storeHandle();
  }

  buyClickHandle() {
    this.props.buyClickHandle();
  }
}

// Redux
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyAndStore)