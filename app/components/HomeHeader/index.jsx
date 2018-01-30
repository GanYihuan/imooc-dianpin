import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom';
import SearchInput from '../SearchInput';
import styles from './style.less';


class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      keyword: ''
    }
  }

  render() {
    return (
        <div id={styles['home-header']} className={styles['clear-fix']}>
          <div className={styles['home-header-left'] + ' float-left'}>
            <Link to={'/city'}>
              <span>{this.props.cityName}</span>
              &nbsp;
              <i className={'icon-angle-down'}/>
            </Link>
          </div>
          <div className={styles['home-header-right'] + ' float-right'}>
            <Link to={'/login'}>
              <i className={'icon-user'}/>
            </Link>
          </div>
          <SearchInput value={''} enterHandle={this.enterHandle.bind(this)}/>
        </div>
    )
  }

  enterHandle(value) {
    // js方式路由
    // 跳转的到指定的路由
    // all 类型
    this.props.history.push('/search/all/' + encodeURIComponent(value));
  }
}

export default HomeHeader;