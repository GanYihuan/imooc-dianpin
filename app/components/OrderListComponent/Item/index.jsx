import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class Item extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const data = this.props.data;
    return (
        <div className={styles["order-item-container"] + " clear-fix"}>
          <div className={styles["order-item-img"] + " float-left"}>
            <img src={data.img}/>
          </div>
          <div className={styles["order-item-comment"] + " float-right"}>
            <button>评论</button>
          </div>
          <div className={styles["order-item-content"]}>
            <p>商户：{data.title}</p>
            <p>数量：{data.count}</p>
            <p>价格：${data.price}</p>
          </div>
        </div>
    )
  }
}


export default Item