import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom';
import SearchInput from '';
import styles from '';


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
        <div id={styles['home-header']} className={'clear-fix'}></div>
    )
  }
}