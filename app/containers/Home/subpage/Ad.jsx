import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AdData from '../../../../mockServer/home/ad';
import {getAdData} from '../../../fetch/home/home';
import HomeAd from '../../../components/HomeAd';


class Ad extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }

  render() {
    return (
        <div>
          {
            this.state.data.length
                ? <HomeAd data={this.state.data}/>
                : <div>加载中...</div>
          }
        </div>
    )
  }

  componentDidMount() {
    // koa接口
    const result = getAdData();
    result
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return AdData;
          }
        })
        .then((json) => {
          const data = json;
          if (data.length) {
            this.setState({
              data: data
            })
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
  }
}

export default Ad