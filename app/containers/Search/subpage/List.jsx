import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// redux
import {connect} from 'react-redux';
import {getSearchData} from '../../../fetch/search/search';
import ListData from '../../../../mockServer/search/list';
// component
import ListCompoent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';


const initialState = {
  data: [],
  hasMore: false,
  isLoadingMore: false,
  page: 0
};


class SearchList extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = initialState;
  }

  render() {
    return (
        <div>
          {
            this.state.data.length
                ? <ListCompoent data={this.state.data}/>
                : <div>{/* loading... */}</div>
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
    this.loadFirstPageData()
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
            return res.json()
          } else {
            console.log("当前城市：" + this.props.cityName);
            console.log("当前页码：" + this.state.page);
            console.log("当前关键字：" + this.props.keyword);
            return ListData;
          }
        })
        .then((json) => {
          const hasMore = json.hasMore;
          const data = json.data;
          this.setState({
            hasMore: hasMore,
            isLoadingMore: false,
            // Note that this is the latest available data,
            // and after stitching to the original data,
            // use the CONCAT function
            data: this.state.data.concat(data),
          })
        })
        .catch((err) => {
          console.log(err.message);
        })
  }

  // Page first rendering, will walk Componentdidmount
  // The page again renders, will not walk componentdidmount, but only go componentdidupdate
  // Process a search again
  componentDidUpdate(prevProps, prevState) {
    const keyword = this.props.keyword;
    const category = this.props.category;
    // Ignored when search conditions are exactly equal. IMPORTANT!!!
    if (keyword === prevProps.keyword && category === prevProps.category) {
      return
    }
    // Reset State.
    this.setState(initialState);
    // Reload data agan.
    this.loadFirstPageData();
  }
}

// redux
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)