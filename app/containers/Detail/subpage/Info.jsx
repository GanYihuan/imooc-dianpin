import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// data
import {getDetail} from '../../../fetch/detail/detail';
import InfoData from '../../../../mockServer/detail/info';
// compnent
import DetailInfo from '../../../components/DetailInfo';


class Info extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      info: false
    }
  }

  render() {
    return (
        <div>
          {
            this.state.info
                ? <DetailInfo data={this.state.info}/>
                : <div>loading...</div>
          }
        </div>
    )
  }

  componentDidMount() {
    const id = this.props.id;
    const result = getDetail(id);
    result
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("当前id：" + id);
            return InfoData;
          }
        })
        .then((json) => {
          this.setState({
            // !!a == true, if(a){} will running
            info: json
          })
        })
        .catch((err) => {
          console.log(err.message);
        })
  }
}

export default Info