import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getListData} from '../../../fetch/home/home';
import HomeList from '../../../components/List';
import LoadMore from '../../../components/LoadMore';
import ListData from '../../../../mockServer/home/list';
import styles from './style.less';


class List extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      // have more data? Requires back-end return
      hasMore: false,
      // Is it loaded?
      isLoadingMore: false,
      // Store list information
      data: [],
      // Record next page number, home 0
      page: 0
    }
  }

  render() {
    return (
        <div>
          <h2 className={styles['home-list-title']}>猜你喜欢</h2>
          {
            this.state.data.length
                ? <HomeList data={this.state.data}/>
                : <div>{/*加载中*/}</div>
          }
          {
            this.state.hasMore
                ?
                <LoadMore
                    isLoadingMore={this.state.isLoadingMore}
                    loadMoreFn={this.loadMoreData.bind(this)}
                />
                : ''
          }
        </div>
    )
  }

  componentDidMount() {
    const cityName = this.props.cityName;
    const result = getListData(cityName, 0);
    this.resultHandle(result);
  }

  // get data
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    });
    const cityName = this.props.cityName;
    const page = this.state.page;
    const result = getListData(cityName, page);
    this.resultHandle(result);
    this.setState({
      page: page + 1
    });
  }

  // handle data
  resultHandle(result) {
    result
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("当前城市：" + this.props.cityName);
            console.log("当前页码：" + this.state.page);
            return ListData;
          }
        })
        .then((json) => {
          const data = json.data;
          const hasMore = json.hasMore;
          this.setState({
            hasMore: hasMore,
            isLoadingMore: false,
            // Data stitching up
            data: this.state.data.concat(data),
          })
        })
        .catch((err) => {
          console.log(err.message);
        })
  }
}

export default List