import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Item from './Item/index';
import styles from './style.less';


class OrderListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    // 获取数据
    const data = this.props.data;
    const submitComment = this.props.submitComment;

    return (
        <div className={styles["order-list-container"]}>
          {
            data.map((item, index) => {
              return (
                  <Item
                      key={index}
                      data={item}
                      submitComment={submitComment}
                  />
              )
            })
          }
        </div>
    )
  }
}


export default OrderListComponent