import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import styles from '';


class Category extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdat = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      index: 0
    }
  }

  render() {
    const opt = {
      auto: 2500,
      callback: (index) => {
        this.setState({
          index: index
        })
      }
    };

    return (
        <div id={styles['home-category']}>
          <ReactSwipe swipeOptions={opt}>
            <div className={styles['carousel-item']}>
              <ul className={styles['clear-fix']}>
                <Link to={'/search/jingdian'}>
                  <li className={styles['jindian'] + ' float-left'}></li>
                </Link>
                <Link to={'/search/ktv'}>
                  <li className={styles['gouwu'] + ' float-left'}></li>
                </Link>
                <Link to={'/search/shengofuwu'}>
                  <li className={styles['shenhuofuwu'] + ' float-left'}></li>
                </Link>
              </ul>
            </div>
          </ReactSwipe>
          <div className={styles['index-container']}>
            <ul>
              <li
                className={this.state.index === 0 ? styles['selected'] : ''}
                data-index={'0'}
              />
            </ul>
          </div>
        </div>
    )
  }
}