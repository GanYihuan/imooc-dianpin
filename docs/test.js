import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from '';


class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div className={styles['load-more']} ref={'wrapper'}>
          {
            this.props.isLoadMore
                ? <span>loading...</span>
                : <span onClick={this.loadMoreHandle.bind(this)}></span>
          }
        </div>
    )
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const laodMoreFn = this.props.loadMoreFn;

    function callback() {
      const top = wrapper.getBoundingClientReact().top;
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        loadMoreFn();
      }
    }

    let timeAction;
    window.addEventListener('scroll', () => {
      if (this.props.isLoadingMore) {
        return;
      }
      if (timeAction) {
        clearTimeout(timeAction);
      }
      timeAction = setTimeout(callback, 50);
    })
  }

  loadMoreHandle() {
    this.props.loadMoreFn();
  }
}