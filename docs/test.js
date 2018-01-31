import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {getSearchData} from "../app/fetch/search/search";
import ListData from '';
import ListComponent from '';
import LoadMore from '';


const initialState = {
  data: [],
  hasMore: false,
  isLoadingMore: false,
  page: 0
};


class SearchList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = initialState;
  }

  render() {
    return (
        <div>
          {
            this.state.data.length
                ? <ListComponent data={this.state.data}/>
                : <div></div>
          }
          {
            this.state.hasMore
                ?
                <LoadMore
                    isLoadMore={this.state.isLoadingMore}
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
    const cityName = this.props.userinfo.cityName;
    const keyword = this.props.keyword || '';
    const category = this.props.category;
    const result = getSearchData(0, cityName, category, keyword);
    this.resultHandle(result);
  }

  loadMoreData() {
    this.setState({
      isLoadingMore: true
    });
    const page = this.state.page;
    const cityName = this.props.userinfo.cityName;
    const keyword = this.props.keyword || '';
    const category = this.props.category;
    const result = getSearchData(page, cityName, category, keyword);
    this.resultHandle(result);
  }

  resultHandle(result) {
    const page = this.state.page;
    this.setState({
      page: page + 1
    });
    result
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return ListData
          }
        })
        .then((json) => {
          const hasMore = json.hasMore;
          const data = json.data;
          this.setState({
            hasMore: hasMore,
            isLoadingMore: false,
            data: this.state.data.concat(data),
          })
        })
        .catch((err) => {
          console.log(err.message);
        })
  }

  componentDidUpdate(prevProps, prevState) {
    const keyword = this.props.keyword;
    const category = this.props.category;
    if (keyword === prevProps.keyword && category === prevProps.category) {
      return
    }
    this.setState(initialState);
    this.loadFirstPageData();
  }
}