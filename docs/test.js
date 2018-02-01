import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// data
import CommentData from '../../../../mockServer/detail/comment';
import {getCommentData} from '../../../fetch/detail/detail';
// component
import ListComponent from '../../../components/CommentList';
import LoadMore from '../../../components/LoadMore';
import styles from './style.less';


class Comment extends Comment {
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
        <div className={styles['detail-comment-subpage']}>
          <h2></h2>
          {
            this.state.data.length
                ? <ListComponent data={this.state.data}/>
                : <div className={styles['loading']}>loading...</div>
          }
          {
            this.state.hasMore
                ?
                <LoadMore
                    isLoadingMore={this.state.isLoadingMore}
                    loadMoreFn={this.loadMoreData.bind(this)}
                /> : ''
          }
        </div>
    )
  }

  componentDidMount() {
    this.loadFirstPageData();
  }

  loadFirstPageData() {
    const id = this.props.id;
    const result = getCommentData(0, id);
    this.resultHandle(result);
  }

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
            return res.json();
          }else{
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
            data: this.state.data.concat(data)
          })
        })
        .catch((err) => {
          console.log(err.message);
        })
  }
}