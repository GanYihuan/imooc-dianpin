import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
        <div className={styles['search-container']}>
          <i className="icon-search"/>
          <input
              type="text"
              placeholder="请输入关键字"
              // 非约束性,dom的操作，优化能力差
              // defaultValue就是原生DOM中的value属性
              // <input ref="input" defaultValue="1"/>
              // var input = this.refs.input
              // console.log(input.value)
              //
              // 约束性，监控input变化，将值保存入state中，从state里面获取值
              value={this.state.value}
              onChange={this.changeHandle.bind(this)}
              onKeyUp={this.keyUpHandle.bind(this)}
          />
        </div>
    )
  }

  componentDidMount() {
    this.setState({
      value: this.props.value || ''
    })
  }

  changeHandle(e) {
    this.setState({
      value: e.target.value
    })
  }

  keyUpHandle(e) {
    if (e.keyCode !== 13) {
      return;
    }

    this.props.enterHandle(this.state.value);
  }
}

export default SearchInput