import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// data
import CommentData from '../../../../mockServer/detail/comment';
import {getCommentData} from '../../../fetch/detail/detail';
// component
import ListComponent from '../../../components/CommentList';
import LoadMore from '../../../components/LoadMore';
import styles from './style.less';


class Comment extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0
    }
  }

  render() {
    return (
        <div className={styles["detail-comment-subpage"]}>
          <h2>用户点评</h2>
          {
            this.state.data.length
                ? <ListComponent data={this.state.data}/>
                : <div className={styles["loading"]}>加载中...</div>
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
    this.loadFirstPageData();
  }

  // simillar to loadMoreData
  loadFirstPageData() {
    const id = this.props.id;
    const result = getCommentData(0, id);
    this.resultHandle(result)
  }

  // simillar to loadFirstPageData
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    });
    const id = this.props.id;
    const page = this.state.page;
    const result = getCommentData(page, id);
    this.resultHandle(result);
  }

  resultHandle(result) {
    result
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return CommentData
          }
        })
        .then((json) => {
          const page = this.state.page;
          const hasMore = json.hasMore;
          const data = json.data;
          this.setState({
            page: page + 1,
            hasMore: hasMore,
            isLoadingMore: false,
            // Note that this is the latest available data,
            // and after stitching to the original data,
            // use the CONCAT function
            data: this.state.data.concat(data)
          })
        })
        .catch((err) => {
          console.error('详情页获取用户评论数据出错, ', err.message);
        })
  }
}

export default Comment