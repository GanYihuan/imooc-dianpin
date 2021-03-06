import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './style.less';


class Star extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    // 获取 star 数量，并取余5（最多5个star）
    let star = this.props.star || 0;
    if (star > 5) {
      star = star % 5
    }
    // <i> className,  can't use styles['icon-star']
    return (
        <div className={styles["star-container"]}>
          {
            [1, 2, 3, 4, 5].map((item, index) => {
              const lightClass = star >= item ? styles["light"] : '';
              return (
                  <i key={index} className={'icon-star ' + lightClass}/>
              )
            })
          }
        </div>
    )
  }
}

export default Star