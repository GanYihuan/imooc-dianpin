import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getOrderListData} from '../../../fetch/user/orderList';
import OrderListComponent from '../../../components/OrderListComponent/index';
import styles from './style.less';


class OrderList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }

  render() {
    return (
        <div className={styles["order-list-container"]}>
          <h2>您的订单</h2>
          {
            this.state.data.length
                ? <OrderListComponent data={this.state.data}/>
                : <p>没有数据</p>
          }
        </div>
    )
  }

  componentDidMount() {
    const username = this.props.username;
    if (username) {
      this.loadOrderList(username);
    }
  }

  loadOrderList(username) {
    const result = getOrderListData(username);
    result
        .then(res => {
          return res.json()
        })
        .then(json => {
          console.log(json);
          this.setState({
            data: json
          });
        })
  }
}


export default OrderList