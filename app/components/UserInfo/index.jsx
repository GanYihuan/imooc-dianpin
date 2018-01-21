import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div className={styles["userinfo-container"]}>
          <p>
            <i className="icon-user"/>
            &nbsp;
            <span>{this.props.username}</span>
          </p>
          <p>
            <i className="icon-map-marker"/>
            &nbsp;
            <span>{this.props.cityName}</span>
          </p>
        </div>
    )
  }
}


export default UserInfo