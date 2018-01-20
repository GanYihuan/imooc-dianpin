import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appActions from '../../actions/app';
import Header from '../../components/Header';
import Info from './subpage/Info';
import Comment from './subpage/Comment';
import Buy from './subpage/Buy';


class Detail extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    // 获取路由 /Users/ganyihuan/Documents/Code/Web/RN/dianpin/app/appContainer.jsx
    // 里的参数id,  path="/detail/:id"
    const id = this.props.match.params.id;
    // const history = hashHistory;

    return (
        <div>
          <Header title="商户详情"/>
          <Info id={id}/>
          <Buy
              id={id}
              history={this.props.history}
          />
          <Comment id={id}/>
        </div>
    )
  }

  componentDidMount() {
    this.props.appActionList.menu({
      location: 0
    });
  }
}


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    // appActionList 使用 menu
    appActionList: bindActionCreators(appActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);