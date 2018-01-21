import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class Item extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      // 0: 未评价
      // 1: 评价中
      // 2: 已评价
      commentState: 2
    }
  }

  render() {
    const data = this.props.data;
    return (
        <div className={styles["order-item-container"] + " clear-fix"}>
          <div className={styles["order-item-img"] + " float-left"}>
            <img src={data.img}/>
          </div>
          <div className={styles["order-item-comment"] + " float-right"}>
            {
              this.state.commentState === 0
                  ?
                  <button
                      className={styles["btn"]}
                      onClick={this.showComment.bind(this)}
                  >
                    评论
                  </button>
                  :
                  this.state.commentState === 1
                      ? ''
                      : <button className={styles["unselected-btn"]}>已评价</button>
            }
          </div>
          <div className={styles["order-item-content"]}>
            <p>商户：{data.title}</p>
            <p>数量：{data.count}</p>
            <p>价格：${data.price}</p>
          </div>
          <div>
            {
              this.state.commentState === 1
                  ?
                  <div>
                    <textarea></textarea>
                    <button>提交</button>
                    <button onClick={this.hideComment.bind(this)}>取消</button>
                  </div>
                  :
                  ''
            }
          </div>
        </div>
    )
  }

  componentDidMount() {
    this.setState({
      commentState: this.props.data.commentState
    })
  }

  showComment() {
    this.setState({
      commentState: 1
    })
  }

  hideComment() {
    this.setState({
      commentState: 0
    })
  }
}


export default Item