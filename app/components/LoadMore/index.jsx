import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div className={styles['load-more']} ref={'wrapper'}>
          {
            this.props.isLoadingMore
                ? <span>loading...</span>
                : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
          }
        </div>
    )
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const loadMoreFn = this.props.loadMoreFn;
    function callback() {
      // Distance from top of page
      const top = wrapper.getBoundingClientRect().top;
      // Screen height
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        // wrapper: Load on exposure
        loadMoreFn();
      }
    }
    // Scrolling events
    let timeAction;
    window.addEventListener('scroll', () => {
      // Do not process while loading
      // isLoadingMore: Is it loaded?
      if (this.props.isLoadingMore) {
        return;
      }
      // Clean Time Setup First.
      if (timeAction) {
        clearTimeout(timeAction);
      }
      timeAction = setTimeout(callback, 50);
    });
  }

  loadMoreHandle() {
    this.props.loadMoreFn();
  }
}

export default LoadMore