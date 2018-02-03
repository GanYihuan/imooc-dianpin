import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appActions from '../../actions/app';
// Component
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
    // Get route app/appContainer.jsx
    // Parameter ID,  path="/detail/:id"
    const id = this.props.match.params.id;
    return (
        <div>
          <Header title={'商户详情'}/>
          <Info id={id}/>
          <Buy id={id} history={this.props.history}/>
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

// redux
function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    // appActionList use menu
    appActionList: bindActionCreators(appActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);